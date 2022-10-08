/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  RegistryStorage,
  RegistryStorageInterface,
} from "../../../../contracts/apwine/Controller/RegistryStorage";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IRegistry",
        name: "_registry",
        type: "address",
      },
    ],
    name: "RegistryChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IRegistry",
        name: "_registry",
        type: "address",
      },
    ],
    name: "setRegistry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610ba9806100206000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c806391d148541161006657806391d14854146101d8578063a217fddf1461023c578063a91ee0dc1461025a578063ca15c8731461029e578063d547741f146102e057610093565b8063248a9ca3146100985780632f2ff15d146100da57806336568abe146101285780639010d07c14610176575b600080fd5b6100c4600480360360208110156100ae57600080fd5b810190808035906020019092919050505061032e565b6040518082815260200191505060405180910390f35b610126600480360360408110156100f057600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061034e565b005b6101746004803603604081101561013e57600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506103d8565b005b6101ac6004803603604081101561018c57600080fd5b810190808035906020019092919080359060200190929190505050610471565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610224600480360360408110156101ee57600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506104a3565b60405180821515815260200191505060405180910390f35b6102446104d5565b6040518082815260200191505060405180910390f35b61029c6004803603602081101561027057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506104dc565b005b6102ca600480360360208110156102b457600080fd5b81019080803590602001909291905050506105ef565b6040518082815260200191505060405180910390f35b61032c600480360360408110156102f657600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610616565b005b600060336000838152602001908152602001600020600201549050919050565b61037560336000848152602001908152602001600020600201546103706106a0565b6104a3565b6103ca576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602f815260200180610ac1602f913960400191505060405180910390fd5b6103d482826106a8565b5050565b6103e06106a0565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610463576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602f815260200180610b45602f913960400191505060405180910390fd5b61046d828261073c565b5050565b600061049b82603360008681526020019081526020016000206000016107d090919063ffffffff16565b905092915050565b60006104cd82603360008681526020019081526020016000206000016107ea90919063ffffffff16565b905092915050565b6000801b81565b6105097f1effbbff9c66c5e59634f24fe842750c60d18891155c32dd155fc2d661a4c86d60001b336104a3565b61055e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180610b206025913960400191505060405180910390fd5b80606560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fdb0239c63d4033dcdd21bd44f8dd479a03efbae12f6bbe27c0a5f923d26514cc81604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a150565b600061060f6033600084815260200190815260200160002060000161081a565b9050919050565b61063d60336000848152602001908152602001600020600201546106386106a0565b6104a3565b610692576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526030815260200180610af06030913960400191505060405180910390fd5b61069c828261073c565b5050565b600033905090565b6106d0816033600085815260200190815260200160002060000161082f90919063ffffffff16565b15610738576106dd6106a0565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b610764816033600085815260200190815260200160002060000161085f90919063ffffffff16565b156107cc576107716106a0565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45b5050565b60006107df836000018361088f565b60001c905092915050565b6000610812836000018373ffffffffffffffffffffffffffffffffffffffff1660001b610912565b905092915050565b600061082882600001610935565b9050919050565b6000610857836000018373ffffffffffffffffffffffffffffffffffffffff1660001b610946565b905092915050565b6000610887836000018373ffffffffffffffffffffffffffffffffffffffff1660001b6109b6565b905092915050565b6000818360000180549050116108f0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526022815260200180610a9f6022913960400191505060405180910390fd5b8260000182815481106108ff57fe5b9060005260206000200154905092915050565b600080836001016000848152602001908152602001600020541415905092915050565b600081600001805490509050919050565b60006109528383610912565b6109ab5782600001829080600181540180825580915050600190039060005260206000200160009091909190915055826000018054905083600101600084815260200190815260200160002081905550600190506109b0565b600090505b92915050565b60008083600101600084815260200190815260200160002054905060008114610a925760006001820390506000600186600001805490500390506000866000018281548110610a0157fe5b9060005260206000200154905080876000018481548110610a1e57fe5b9060005260206000200181905550600183018760010160008381526020019081526020016000208190555086600001805480610a5657fe5b60019003818190600052602060002001600090559055866001016000878152602001908152602001600020600090556001945050505050610a98565b60009150505b9291505056fe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e6473416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f206772616e74416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f207265766f6b65526f6c65436865636b61626c653a2043616c6c65722073686f756c642062652041444d494e416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636520726f6c657320666f722073656c66a2646970667358221220c752ce9360ae75fd18685f2644e2c0d2141f74548f28daad2bc5fbbc2fdba8de64736f6c63430007060033";

type RegistryStorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RegistryStorageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RegistryStorage__factory extends ContractFactory {
  constructor(...args: RegistryStorageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<RegistryStorage> {
    return super.deploy(overrides || {}) as Promise<RegistryStorage>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): RegistryStorage {
    return super.attach(address) as RegistryStorage;
  }
  override connect(signer: Signer): RegistryStorage__factory {
    return super.connect(signer) as RegistryStorage__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RegistryStorageInterface {
    return new utils.Interface(_abi) as RegistryStorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RegistryStorage {
    return new Contract(address, _abi, signerOrProvider) as RegistryStorage;
  }
}
