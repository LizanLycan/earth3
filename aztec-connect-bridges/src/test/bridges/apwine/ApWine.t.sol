// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {BridgeTestBase} from "./../../aztec/base/BridgeTestBase.sol";

import {ICurvePool} from "../../../interfaces/curve/ICurvePool.sol";
import {IFutureVault} from "../../../interfaces/apwine/IFutureVault.sol";
import {ILido} from "../../../interfaces/lido/ILido.sol";
import {IApWineController} from "../../../interfaces/apwine/IApWineController.sol";
import {IPT} from "../../../interfaces/apwine/IPT.sol";

import {ApWineBridge} from "../../../bridges/apwine/ApWineBridge.sol";
import {AztecTypes} from "../../../aztec/libraries/AztecTypes.sol";
import {ErrorLib} from "../../../bridges/base/ErrorLib.sol";

contract ApWineTest is BridgeTestBase {
    // solhint-disable-next-line
    ILido public constant LIDO = ILido(0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84);
    IPT public constant STETH_PT = IPT(0x137189D1342AaBE7Cd75B42B265E4647596aaa01);
    ICurvePool public constant CURVE_POOL = ICurvePool(0xDC24316b9AE028F1497c275EB9192a3Ea0f67022);
    IApWineController public constant APWINE_CONTROLLER = IApWineController(0x4bA30FA240047c17FC557b8628799068d4396790);
    IFutureVault public constant LIDO_FUTURE_VAULT = IFutureVault(0x35bBdC3FBdC26f7DfEe5670aF50B93c7EaBCe2c0);

    AztecTypes.AztecAsset private ethAsset;
    AztecTypes.AztecAsset private stEthPTAsset;

    ApWineBridge private bridge;
    uint256 private idIn;

    function setUp() public {
        bridge = new ApWineBridge(address(ROLLUP_PROCESSOR), address(ROLLUP_PROCESSOR));
        vm.deal(address(bridge), 0);
        vm.prank(MULTI_SIG);
        ROLLUP_PROCESSOR.setSupportedBridge(address(bridge), 500000);
        idIn = ROLLUP_PROCESSOR.getSupportedBridgesLength();

        vm.prank(MULTI_SIG);
        ROLLUP_PROCESSOR.setSupportedAsset(address(STETH_PT), 500000);

        ethAsset = getRealAztecAsset(address(0));
        stEthPTAsset = getRealAztecAsset(address(STETH_PT));
    }

    function testErrorCodes() public {
        vm.expectRevert(ErrorLib.InvalidCaller.selector);
        bridge.convert(emptyAsset, emptyAsset, emptyAsset, emptyAsset, 0, 0, 0, address(0));

        vm.startPrank(address(ROLLUP_PROCESSOR));

        vm.expectRevert(ErrorLib.InvalidInputA.selector);
        bridge.convert(emptyAsset, emptyAsset, emptyAsset, emptyAsset, 0, 0, 0, address(0));

        vm.expectRevert(ErrorLib.InvalidOutputA.selector);
        bridge.convert(ethAsset, emptyAsset, emptyAsset, emptyAsset, 0, 0, 0, address(0));

        vm.expectRevert(ErrorLib.InvalidOutputA.selector);
        bridge.convert(stEthPTAsset, emptyAsset, emptyAsset, emptyAsset, 0, 0, 0, address(0));

        vm.expectRevert(ErrorLib.AsyncDisabled.selector);
        bridge.finalise(stEthPTAsset, emptyAsset, emptyAsset, emptyAsset, 0, 0);

        vm.stopPrank();
    }

    function testApWineBridge() public {
        validateApWineBridge(100e18, 50e18);
        // validateApWineBridge(50000e18, 40000e18);
    }

    /**
        Testing flow:
        1. Send ETH to bridge
        2. Get back stETHPT
        3. Send stETHPT to bridge
        4. Get back ETH
     */
    function validateApWineBridge(uint256 _balance, uint256 _depositAmount) public {
        // Send ETH to bridge

        vm.deal(address(ROLLUP_PROCESSOR), _balance);

        // Convert ETH to stETHPT
        validateApWineDeposit(_depositAmount);

        // convert stETHPT back to ETH using the same bridge
        validateApWineWithdraw(STETH_PT.balanceOf(address(ROLLUP_PROCESSOR)));
    }

    function validateApWineDeposit(uint256 _depositAmount) public {
        uint256 beforeETHBalance = address(ROLLUP_PROCESSOR).balance;
        uint256 beforeStEthPTBalance = STETH_PT.balanceOf(address(ROLLUP_PROCESSOR));

        uint256 stETHPTExpectedBalance = LIDO_FUTURE_VAULT.getPTPerAmountDeposited(_computeEthToWST(_depositAmount));

        uint256 bridgeCallData = encodeBridgeCallData(idIn, ethAsset, emptyAsset, stEthPTAsset, emptyAsset, 0);
        vm.expectEmit(true, true, false, true);
        emit DefiBridgeProcessed(bridgeCallData, getNextNonce(), _depositAmount, 0, 0, true, "");
        sendDefiRollup(bridgeCallData, _depositAmount);

        uint256 afterETHBalance = address(ROLLUP_PROCESSOR).balance;
        uint256 afterStEthPTBalance = STETH_PT.balanceOf(address(ROLLUP_PROCESSOR));

        assertEq(afterETHBalance, beforeETHBalance - _depositAmount, "ETH balance not matching deposit");
        assertEq(afterStEthPTBalance, stETHPTExpectedBalance, "stETHPT balance not matching deposit");
    }

    function validateApWineWithdraw(uint256 _depositAmount) public {
        uint256 beforeETHBalance = address(ROLLUP_PROCESSOR).balance;
        uint256 beforeStEthPTBalance = STETH_PT.balanceOf(address(ROLLUP_PROCESSOR));

        uint256 bridgeCallData = encodeBridgeCallData(idIn, stEthPTAsset, emptyAsset, ethAsset, emptyAsset, 0);
        vm.expectEmit(true, true, false, true);
        emit DefiBridgeProcessed(bridgeCallData, getNextNonce(), _depositAmount, 0, 0, true, "");
        sendDefiRollup(bridgeCallData, _depositAmount);

        uint256 afterETHBalance = address(ROLLUP_PROCESSOR).balance;
        uint256 afterStEthPTBalance = STETH_PT.balanceOf(address(ROLLUP_PROCESSOR));

        assertEq(afterStEthPTBalance, 0, "stETHPT balance not matching withdraw");
        assertGt(afterETHBalance, beforeETHBalance, "ETH balance not matching withdraw");
    }

    function _computeEthToWST(uint256 _amount) internal returns (uint256) {
        uint256 totalShares = LIDO.getTotalShares();
        uint256 totalSupply = LIDO.totalSupply();

        // Compute the number of minted shares and increase internal accounting
        uint256 mintShares = (_amount * totalShares) / totalSupply;
        totalShares += mintShares;
        totalSupply += _amount;

        // Compute the stEth balance of the bridge
        uint256 bridgeShares = LIDO.sharesOf(address(bridge)) + mintShares;
        uint256 stEthBal = (bridgeShares * totalSupply) / totalShares;

        return stEthBal;
    }
}
