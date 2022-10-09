/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Token, TokenInterface } from "../../contracts/Token";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "ADMIN",
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
    inputs: [],
    name: "BURNER",
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
    inputs: [],
    name: "MINTER",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200315238038062003152833981810160405281019062000037919062000767565b81818160039080519060200190620000519291906200051a565b5080600490805190602001906200006a9291906200051a565b505050620000b133620000826200018f60201b60201c565b60ff16600a62000093919062000979565b64e8d4a51000620000a59190620009ca565b6200019860201b60201c565b620000e37fdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42336200031160201b60201c565b620001357ff0887ba65ee2024ea881d91b74c2450ef19e1557f03bed3ea9f16b037cbe2dc97fdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec426200032760201b60201c565b620001877f9667e80708b6eeeb0053fa0cca44e028ff548e2a9f029edfeac87c118b08b7c87fdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec426200032760201b60201c565b505062000b9e565b60006012905090565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156200020b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620002029062000a8c565b60405180910390fd5b6200021f600083836200038b60201b60201c565b806002600082825462000233919062000aae565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546200028a919062000aae565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620002f1919062000b1c565b60405180910390a36200030d600083836200039060201b60201c565b5050565b6200032382826200039560201b60201c565b5050565b60006200033a836200048760201b60201c565b90508160056000858152602001908152602001600020600101819055508181847fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff60405160405180910390a4505050565b505050565b505050565b620003a78282620004a760201b60201c565b620004835760016005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550620004286200051260201b60201c565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b600060056000838152602001908152602001600020600101549050919050565b60006005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b600033905090565b828054620005289062000b68565b90600052602060002090601f0160209004810192826200054c576000855562000598565b82601f106200056757805160ff191683800117855562000598565b8280016001018555821562000598579182015b82811115620005975782518255916020019190600101906200057a565b5b509050620005a79190620005ab565b5090565b5b80821115620005c6576000816000905550600101620005ac565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200063382620005e8565b810181811067ffffffffffffffff82111715620006555762000654620005f9565b5b80604052505050565b60006200066a620005ca565b905062000678828262000628565b919050565b600067ffffffffffffffff8211156200069b576200069a620005f9565b5b620006a682620005e8565b9050602081019050919050565b60005b83811015620006d3578082015181840152602081019050620006b6565b83811115620006e3576000848401525b50505050565b600062000700620006fa846200067d565b6200065e565b9050828152602081018484840111156200071f576200071e620005e3565b5b6200072c848285620006b3565b509392505050565b600082601f8301126200074c576200074b620005de565b5b81516200075e848260208601620006e9565b91505092915050565b60008060408385031215620007815762000780620005d4565b5b600083015167ffffffffffffffff811115620007a257620007a1620005d9565b5b620007b08582860162000734565b925050602083015167ffffffffffffffff811115620007d457620007d3620005d9565b5b620007e28582860162000734565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008160011c9050919050565b6000808291508390505b60018511156200087a57808604811115620008525762000851620007ec565b5b6001851615620008625780820291505b808102905062000872856200081b565b945062000832565b94509492505050565b60008262000895576001905062000968565b81620008a5576000905062000968565b8160018114620008be5760028114620008c957620008ff565b600191505062000968565b60ff841115620008de57620008dd620007ec565b5b8360020a915084821115620008f857620008f7620007ec565b5b5062000968565b5060208310610133831016604e8410600b8410161715620009395782820a905083811115620009335762000932620007ec565b5b62000968565b62000948848484600162000828565b92509050818404811115620009625762000961620007ec565b5b81810290505b9392505050565b6000819050919050565b600062000986826200096f565b915062000993836200096f565b9250620009c27fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff848462000883565b905092915050565b6000620009d7826200096f565b9150620009e4836200096f565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161562000a205762000a1f620007ec565b5b828202905092915050565b600082825260208201905092915050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b600062000a74601f8362000a2b565b915062000a818262000a3c565b602082019050919050565b6000602082019050818103600083015262000aa78162000a65565b9050919050565b600062000abb826200096f565b915062000ac8836200096f565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111562000b005762000aff620007ec565b5b828201905092915050565b62000b16816200096f565b82525050565b600060208201905062000b33600083018462000b0b565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168062000b8157607f821691505b6020821081141562000b985762000b9762000b39565b5b50919050565b6125a48062000bae6000396000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c806339509351116100c3578063a217fddf1161007c578063a217fddf146103c6578063a457c2d7146103e4578063a9059cbb14610414578063d547741f14610444578063dd62ed3e14610460578063fe6d8124146104905761014d565b806339509351146102e057806340c10f191461031057806370a082311461032c57806391d148541461035c57806395d89b411461038c5780639dc29fac146103aa5761014d565b806323b872dd1161011557806323b872dd1461020c578063248a9ca31461023c5780632a0acc6a1461026c5780632f2ff15d1461028a578063313ce567146102a657806336568abe146102c45761014d565b806301ffc9a71461015257806306fdde0314610182578063095ea7b3146101a0578063118c4f13146101d057806318160ddd146101ee575b600080fd5b61016c6004803603810190610167919061181e565b6104ae565b6040516101799190611866565b60405180910390f35b61018a610528565b604051610197919061191a565b60405180910390f35b6101ba60048036038101906101b591906119d0565b6105ba565b6040516101c79190611866565b60405180910390f35b6101d86105dd565b6040516101e59190611a29565b60405180910390f35b6101f6610601565b6040516102039190611a53565b60405180910390f35b61022660048036038101906102219190611a6e565b61060b565b6040516102339190611866565b60405180910390f35b61025660048036038101906102519190611aed565b61063a565b6040516102639190611a29565b60405180910390f35b61027461065a565b6040516102819190611a29565b60405180910390f35b6102a4600480360381019061029f9190611b1a565b61067e565b005b6102ae61069f565b6040516102bb9190611b76565b60405180910390f35b6102de60048036038101906102d99190611b1a565b6106a8565b005b6102fa60048036038101906102f591906119d0565b61072b565b6040516103079190611866565b60405180910390f35b61032a600480360381019061032591906119d0565b610762565b005b61034660048036038101906103419190611b91565b61079b565b6040516103539190611a53565b60405180910390f35b61037660048036038101906103719190611b1a565b6107e3565b6040516103839190611866565b60405180910390f35b61039461084e565b6040516103a1919061191a565b60405180910390f35b6103c460048036038101906103bf91906119d0565b6108e0565b005b6103ce610919565b6040516103db9190611a29565b60405180910390f35b6103fe60048036038101906103f991906119d0565b610920565b60405161040b9190611866565b60405180910390f35b61042e600480360381019061042991906119d0565b610997565b60405161043b9190611866565b60405180910390f35b61045e60048036038101906104599190611b1a565b6109ba565b005b61047a60048036038101906104759190611bbe565b6109db565b6040516104879190611a53565b60405180910390f35b610498610a62565b6040516104a59190611a29565b60405180910390f35b60007f7965db0b000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480610521575061052082610a86565b5b9050919050565b60606003805461053790611c2d565b80601f016020809104026020016040519081016040528092919081815260200182805461056390611c2d565b80156105b05780601f10610585576101008083540402835291602001916105b0565b820191906000526020600020905b81548152906001019060200180831161059357829003601f168201915b5050505050905090565b6000806105c5610af0565b90506105d2818585610af8565b600191505092915050565b7f9667e80708b6eeeb0053fa0cca44e028ff548e2a9f029edfeac87c118b08b7c881565b6000600254905090565b600080610616610af0565b9050610623858285610cc3565b61062e858585610d4f565b60019150509392505050565b600060056000838152602001908152602001600020600101549050919050565b7fdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec4281565b6106878261063a565b61069081610fd0565b61069a8383610fe4565b505050565b60006012905090565b6106b0610af0565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461071d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161071490611cd1565b60405180910390fd5b61072782826110c5565b5050565b600080610736610af0565b905061075781858561074885896109db565b6107529190611d20565b610af8565b600191505092915050565b7ff0887ba65ee2024ea881d91b74c2450ef19e1557f03bed3ea9f16b037cbe2dc961078c81610fd0565b61079683836111a7565b505050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60006005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60606004805461085d90611c2d565b80601f016020809104026020016040519081016040528092919081815260200182805461088990611c2d565b80156108d65780601f106108ab576101008083540402835291602001916108d6565b820191906000526020600020905b8154815290600101906020018083116108b957829003601f168201915b5050505050905090565b7f9667e80708b6eeeb0053fa0cca44e028ff548e2a9f029edfeac87c118b08b7c861090a81610fd0565b6109148383611307565b505050565b6000801b81565b60008061092b610af0565b9050600061093982866109db565b90508381101561097e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161097590611de8565b60405180910390fd5b61098b8286868403610af8565b60019250505092915050565b6000806109a2610af0565b90506109af818585610d4f565b600191505092915050565b6109c38261063a565b6109cc81610fd0565b6109d683836110c5565b505050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b7ff0887ba65ee2024ea881d91b74c2450ef19e1557f03bed3ea9f16b037cbe2dc981565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610b68576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b5f90611e7a565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610bd8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bcf90611f0c565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92583604051610cb69190611a53565b60405180910390a3505050565b6000610ccf84846109db565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610d495781811015610d3b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d3290611f78565b60405180910390fd5b610d488484848403610af8565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610dbf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610db69061200a565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610e2f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e269061209c565b60405180910390fd5b610e3a8383836114de565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610ec0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610eb79061212e565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610f539190611d20565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610fb79190611a53565b60405180910390a3610fca8484846114e3565b50505050565b610fe181610fdc610af0565b6114e8565b50565b610fee82826107e3565b6110c15760016005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550611066610af0565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b6110cf82826107e3565b156111a35760006005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550611148610af0565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611217576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161120e9061219a565b60405180910390fd5b611223600083836114de565b80600260008282546112359190611d20565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461128a9190611d20565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516112ef9190611a53565b60405180910390a3611303600083836114e3565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611377576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161136e9061222c565b60405180910390fd5b611383826000836114de565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015611409576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611400906122be565b60405180910390fd5b8181036000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816002600082825461146091906122de565b92505081905550600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516114c59190611a53565b60405180910390a36114d9836000846114e3565b505050565b505050565b505050565b6114f282826107e3565b611581576115178173ffffffffffffffffffffffffffffffffffffffff166014611585565b6115258360001c6020611585565b6040516020016115369291906123e6565b6040516020818303038152906040526040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611578919061191a565b60405180910390fd5b5050565b6060600060028360026115989190612420565b6115a29190611d20565b67ffffffffffffffff8111156115bb576115ba61247a565b5b6040519080825280601f01601f1916602001820160405280156115ed5781602001600182028036833780820191505090505b5090507f300000000000000000000000000000000000000000000000000000000000000081600081518110611625576116246124a9565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f780000000000000000000000000000000000000000000000000000000000000081600181518110611689576116886124a9565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600060018460026116c99190612420565b6116d39190611d20565b90505b6001811115611773577f3031323334353637383961626364656600000000000000000000000000000000600f861660108110611715576117146124a9565b5b1a60f81b82828151811061172c5761172b6124a9565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600485901c94508061176c906124d8565b90506116d6565b50600084146117b7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117ae9061254e565b60405180910390fd5b8091505092915050565b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6117fb816117c6565b811461180657600080fd5b50565b600081359050611818816117f2565b92915050565b600060208284031215611834576118336117c1565b5b600061184284828501611809565b91505092915050565b60008115159050919050565b6118608161184b565b82525050565b600060208201905061187b6000830184611857565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156118bb5780820151818401526020810190506118a0565b838111156118ca576000848401525b50505050565b6000601f19601f8301169050919050565b60006118ec82611881565b6118f6818561188c565b935061190681856020860161189d565b61190f816118d0565b840191505092915050565b6000602082019050818103600083015261193481846118e1565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006119678261193c565b9050919050565b6119778161195c565b811461198257600080fd5b50565b6000813590506119948161196e565b92915050565b6000819050919050565b6119ad8161199a565b81146119b857600080fd5b50565b6000813590506119ca816119a4565b92915050565b600080604083850312156119e7576119e66117c1565b5b60006119f585828601611985565b9250506020611a06858286016119bb565b9150509250929050565b6000819050919050565b611a2381611a10565b82525050565b6000602082019050611a3e6000830184611a1a565b92915050565b611a4d8161199a565b82525050565b6000602082019050611a686000830184611a44565b92915050565b600080600060608486031215611a8757611a866117c1565b5b6000611a9586828701611985565b9350506020611aa686828701611985565b9250506040611ab7868287016119bb565b9150509250925092565b611aca81611a10565b8114611ad557600080fd5b50565b600081359050611ae781611ac1565b92915050565b600060208284031215611b0357611b026117c1565b5b6000611b1184828501611ad8565b91505092915050565b60008060408385031215611b3157611b306117c1565b5b6000611b3f85828601611ad8565b9250506020611b5085828601611985565b9150509250929050565b600060ff82169050919050565b611b7081611b5a565b82525050565b6000602082019050611b8b6000830184611b67565b92915050565b600060208284031215611ba757611ba66117c1565b5b6000611bb584828501611985565b91505092915050565b60008060408385031215611bd557611bd46117c1565b5b6000611be385828601611985565b9250506020611bf485828601611985565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611c4557607f821691505b60208210811415611c5957611c58611bfe565b5b50919050565b7f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560008201527f20726f6c657320666f722073656c660000000000000000000000000000000000602082015250565b6000611cbb602f8361188c565b9150611cc682611c5f565b604082019050919050565b60006020820190508181036000830152611cea81611cae565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611d2b8261199a565b9150611d368361199a565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611d6b57611d6a611cf1565b5b828201905092915050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b6000611dd260258361188c565b9150611ddd82611d76565b604082019050919050565b60006020820190508181036000830152611e0181611dc5565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000611e6460248361188c565b9150611e6f82611e08565b604082019050919050565b60006020820190508181036000830152611e9381611e57565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b6000611ef660228361188c565b9150611f0182611e9a565b604082019050919050565b60006020820190508181036000830152611f2581611ee9565b9050919050565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b6000611f62601d8361188c565b9150611f6d82611f2c565b602082019050919050565b60006020820190508181036000830152611f9181611f55565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b6000611ff460258361188c565b9150611fff82611f98565b604082019050919050565b6000602082019050818103600083015261202381611fe7565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b600061208660238361188c565b91506120918261202a565b604082019050919050565b600060208201905081810360008301526120b581612079565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b600061211860268361188c565b9150612123826120bc565b604082019050919050565b600060208201905081810360008301526121478161210b565b9050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b6000612184601f8361188c565b915061218f8261214e565b602082019050919050565b600060208201905081810360008301526121b381612177565b9050919050565b7f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b600061221660218361188c565b9150612221826121ba565b604082019050919050565b6000602082019050818103600083015261224581612209565b9050919050565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60008201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b60006122a860228361188c565b91506122b38261224c565b604082019050919050565b600060208201905081810360008301526122d78161229b565b9050919050565b60006122e98261199a565b91506122f48361199a565b92508282101561230757612306611cf1565b5b828203905092915050565b600081905092915050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000600082015250565b6000612353601783612312565b915061235e8261231d565b601782019050919050565b600061237482611881565b61237e8185612312565b935061238e81856020860161189d565b80840191505092915050565b7f206973206d697373696e6720726f6c6520000000000000000000000000000000600082015250565b60006123d0601183612312565b91506123db8261239a565b601182019050919050565b60006123f182612346565b91506123fd8285612369565b9150612408826123c3565b91506124148284612369565b91508190509392505050565b600061242b8261199a565b91506124368361199a565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561246f5761246e611cf1565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006124e38261199a565b915060008214156124f7576124f6611cf1565b5b600182039050919050565b7f537472696e67733a20686578206c656e67746820696e73756666696369656e74600082015250565b600061253860208361188c565b915061254382612502565b602082019050919050565b600060208201905081810360008301526125678161252b565b905091905056fea2646970667358221220c0ec47c71ccce5e3d453cf7f7e731d33a3dbca32789b36c1667e9ff35edf29ca64736f6c63430008090033";

type TokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Token__factory extends ContractFactory {
  constructor(...args: TokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Token> {
    return super.deploy(_name, _symbol, overrides || {}) as Promise<Token>;
  }
  override getDeployTransaction(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_name, _symbol, overrides || {});
  }
  override attach(address: string): Token {
    return super.attach(address) as Token;
  }
  override connect(signer: Signer): Token__factory {
    return super.connect(signer) as Token__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenInterface {
    return new utils.Interface(_abi) as TokenInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Token {
    return new Contract(address, _abi, signerOrProvider) as Token;
  }
}