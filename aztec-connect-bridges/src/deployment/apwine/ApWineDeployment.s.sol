// SPDX-License-Identifier: Apache-2.0
// Copyright 2022 Aztec.
pragma solidity >=0.8.4;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {BaseDeployment} from "../base/BaseDeployment.s.sol";
import {ApWineBridge} from "../../bridges/apwine/ApWineBridge.sol";

contract ApWineDeployment is BaseDeployment {
    address public constant STETH_PT = address(0x137189D1342AaBE7Cd75B42B265E4647596aaa01);

    function deploy() public returns (address) {
        emit log("Deploying ApWine bridge");

        vm.broadcast();
        ApWineBridge bridge = new ApWineBridge(ROLLUP_PROCESSOR, ROLLUP_PROCESSOR);

        emit log_named_address("ApWine bridge deployed to", address(bridge));

        return address(bridge);
    }

    function deployAndList() public {
        address bridge = deploy();

        uint256 addressId = listBridge(bridge, 500000);

        listAsset(address(STETH_PT), 500000);

        emit log_named_uint("Compound bridge address id", addressId);
    }
}