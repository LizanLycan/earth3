// SPDX-License-Identifier: GPLv2
pragma solidity >=0.8.4;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ICurvePool} from "../../interfaces/curve/ICurvePool.sol";
import {ILido} from "../../interfaces/lido/ILido.sol";
import {IApWineController} from "../../interfaces/apwine/IApWineController.sol";
import {IPT} from "../../interfaces/apwine/IPT.sol";
import {IRollupProcessor} from "../../aztec/interfaces/IRollupProcessor.sol";

import {BridgeBase} from "../base/BridgeBase.sol";
import {ErrorLib} from "../base/ErrorLib.sol";
import {AztecTypes} from "../../aztec/libraries/AztecTypes.sol";

import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract ApWineBridge is BridgeBase {
    using SafeERC20 for ILido;
    using SafeERC20 for IPT;

    error InvalidConfiguration();
    error InvalidWrapReturnValue();
    error InvalidUnwrapReturnValue();

    address public immutable REFERRAL;

    ILido public constant LIDO = ILido(0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84);
    IPT public constant STETH_PT = IPT(0x137189D1342AaBE7Cd75B42B265E4647596aaa01);
    ICurvePool public constant CURVE_POOL = ICurvePool(0xDC24316b9AE028F1497c275EB9192a3Ea0f67022);
    IApWineController public constant APWINE_CONTROLLER = IApWineController(0x4bA30FA240047c17FC557b8628799068d4396790);

    address public constant LIDO_FUTURE_VAULT = 0x35bBdC3FBdC26f7DfEe5670aF50B93c7EaBCe2c0;

    int128 private constant CURVE_ETH_INDEX = 0;
    int128 private constant CURVE_STETH_INDEX = 1;

    event LogBridgeDeposit(address owner, address asset, uint256 amount);
    event LogBridgeWithdraw(address owner, address asset, uint256 amount);

    constructor(address _rollupProcessor, address _referral) BridgeBase(_rollupProcessor) {
        if (CURVE_POOL.coins(uint256(uint128(CURVE_STETH_INDEX))) != address(LIDO)) {
            revert InvalidConfiguration();
        }

        REFERRAL = _referral;

        // As the contract is not supposed to hold any funds, we can pre-approve
        LIDO.safeIncreaseAllowance(address(APWINE_CONTROLLER), type(uint256).max);
        LIDO.safeIncreaseAllowance(address(CURVE_POOL), type(uint256).max);
        STETH_PT.safeIncreaseAllowance(ROLLUP_PROCESSOR, type(uint256).max);
    }

    receive() external payable {}

    function convert(
        AztecTypes.AztecAsset calldata _inputAssetA,
        AztecTypes.AztecAsset calldata,
        AztecTypes.AztecAsset calldata _outputAssetA,
        AztecTypes.AztecAsset calldata,
        uint256 _totalInputValue,
        uint256 _interactionNonce,
        uint64,
        address
    )
    external
    payable
    override(BridgeBase)
    onlyRollup
    returns (
        uint256 outputValueA,
        uint256,
        bool isAsync
    )
    {
        bool isETHInput = _inputAssetA.assetType == AztecTypes.AztecAssetType.ETH;
        bool isStEthPTInput = _inputAssetA.assetType == AztecTypes.AztecAssetType.ERC20 &&
        _inputAssetA.erc20Address == address(STETH_PT);

        if (!(isETHInput || isStEthPTInput)) {
            revert ErrorLib.InvalidInputA();
        }

        isAsync = false;
        outputValueA = isETHInput
        ? _depositETH(_totalInputValue, _outputAssetA)
        : _withdrawETH(_totalInputValue, _outputAssetA, _interactionNonce);
    }

    /**
        Convert ETH -> stETHPT
     */
    function _depositETH(uint256 _totalInputValue, AztecTypes.AztecAsset calldata _outputAsset)
    private
    returns (uint256 outputStETHBalance)
    {
        if (
            _outputAsset.assetType != AztecTypes.AztecAssetType.ERC20 ||
            _outputAsset.erc20Address != address(STETH_PT)
        ) {
            revert ErrorLib.InvalidOutputA();
        }

        emit LogBridgeDeposit(address(this), address(0), address(this).balance);
        emit LogBridgeDeposit(address(this), address(STETH_PT), STETH_PT.balanceOf(address(this)));
        emit LogBridgeDeposit(address(this), address(LIDO), LIDO.balanceOf(address(this)));

        // deposit into lido (return value is shares NOT stETH)
        LIDO.submit{value: _totalInputValue}(REFERRAL);

        emit LogBridgeDeposit(address(this), address(0), address(this).balance);
        emit LogBridgeDeposit(address(this), address(STETH_PT), STETH_PT.balanceOf(address(this)));
        emit LogBridgeDeposit(address(this), address(LIDO), LIDO.balanceOf(address(this)));

        APWINE_CONTROLLER.deposit(LIDO_FUTURE_VAULT, LIDO.balanceOf(address(this)));

        emit LogBridgeDeposit(address(this), address(0), address(this).balance);
        emit LogBridgeDeposit(address(this), address(STETH_PT), STETH_PT.balanceOf(address(this)));
        emit LogBridgeDeposit(address(this), address(LIDO), LIDO.balanceOf(address(this)));

        outputStETHBalance = STETH_PT.balanceOf(address(this));
    }

    /**
        Convert stETHPT to ETH
     */
    function _withdrawETH(
        uint256 _totalInputValue,
        AztecTypes.AztecAsset calldata _outputAsset,
        uint256 _interactionNonce
    ) private returns (uint256 outputValue) {
        if (_outputAsset.assetType != AztecTypes.AztecAssetType.ETH) {
            revert ErrorLib.InvalidOutputA();
        }

        emit LogBridgeWithdraw(address(this), address(0), address(this).balance);
        emit LogBridgeWithdraw(address(this), address(STETH_PT), STETH_PT.balanceOf(address(this)));
        emit LogBridgeWithdraw(address(this), address(LIDO), LIDO.balanceOf(address(this)));

        // withdraw stWTH into APWine
        APWINE_CONTROLLER.withdraw(LIDO_FUTURE_VAULT, _totalInputValue);

        uint256 outputStETHBalance = LIDO.balanceOf(address(this));

        emit LogBridgeWithdraw(address(this), address(0), address(this).balance);
        emit LogBridgeWithdraw(address(this), address(STETH_PT), STETH_PT.balanceOf(address(this)));
        emit LogBridgeWithdraw(address(this), address(LIDO), LIDO.balanceOf(address(this)));

        // Exchange stETH to ETH via curve
        uint256 dy = CURVE_POOL.exchange(CURVE_STETH_INDEX, CURVE_ETH_INDEX, outputStETHBalance, 0);

        emit LogBridgeWithdraw(address(this), address(0), address(this).balance);
        emit LogBridgeWithdraw(address(this), address(STETH_PT), STETH_PT.balanceOf(address(this)));
        emit LogBridgeWithdraw(address(this), address(LIDO), LIDO.balanceOf(address(this)));

        outputValue = address(this).balance;
        if (outputValue < dy) {
            revert InvalidUnwrapReturnValue();
        }

        // Send ETH to rollup processor
        IRollupProcessor(ROLLUP_PROCESSOR).receiveEthFromBridge{value: outputValue}(_interactionNonce);
    }
}
