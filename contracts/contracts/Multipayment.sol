//SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.0;
pragma abicoder v2;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";

contract Multipayment is Initializable, OwnableUpgradeable, ReentrancyGuardUpgradeable {

    struct Payment {
        address token;
        address[] receivers;
        uint256[] amountsToTransfer;
    }
    
    event BatchPayment(address _erc20TokenAddress, address[] _receivers, uint256[] _amountsToTransfer);

    function initialize(
    ) public initializer {
        __ReentrancyGuard_init();
        __Ownable_init();
    }

    /**
     * Perform the payments to the given addresses and amounts, public method.
     * @param _payments The array of the Payment data.
     * @notice Only for ERC20.
     */
    function performMultiPayment(Payment[] calldata _payments) external payable nonReentrant {
        for (uint256 i = 0; i < _payments.length; i++) {
            require(
                _payments[i].amountsToTransfer.length == _payments[i].receivers.length,
                "Arrays must have same length"
            );

            _performERC20Payment(_payments[i].token, _payments[i].receivers, _payments[i].amountsToTransfer);
        }
    }

    function _performERC20Payment(
        address _erc20TokenAddress,
        address[] calldata _receivers,
        uint256[] calldata _amountsToTransfer
    ) internal {
        for (uint256 i = 0; i < _receivers.length; i++) {
            require(_receivers[i] != address(0), "Cannot send to a 0 address");
            TransferHelper.safeTransferFrom(_erc20TokenAddress, msg.sender, _receivers[i], _amountsToTransfer[i]);
        }
        emit BatchPayment(_erc20TokenAddress, _receivers, _amountsToTransfer);
    }

    receive() external payable {}
}