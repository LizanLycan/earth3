import {HardhatUserConfig} from 'hardhat/config';
import * as dotenv from 'dotenv';

dotenv.config();

const mnemonic = process.env.HDWALLET_MNEMONIC;
const forkEnabled = process.env.FORK_ENABLED || false;

const networks: HardhatUserConfig['networks'] = {
  localhost: {
    live: false,
    chainId: 1,
    url: 'http://127.0.0.1:8545',
    allowUnlimitedContractSize: true,
  },
};

if (forkEnabled) {
  networks.hardhat = {
    live: false,
    chainId: 1,
    forking: {
      url: 'https://eth-mainnet.gateway.pokt.network/v1/lb/' + process.env.POCKET_NETWORK_KEY,
    },
    accounts: {
      mnemonic,
    },
  };
} else {
  networks.hardhat = {
    live: false,
    allowUnlimitedContractSize: true,
  };
}

if (mnemonic) {
  networks.polygon = {
    live: true,
    chainId: 137,
    url: 'https://poly-mainnet.gateway.pokt.network/v1/lb/' + process.env.POCKET_NETWORK_KEY,
    accounts: {
      mnemonic,
    },
    tags: ['prod'],
  };

  networks.polygonMumbai = {
    live: true,
    chainId: 80001,
    url: 'https://rpc-mumbai.maticvigil.com/',
    accounts: {
      mnemonic,
    },
    tags: ['staging'],
  };

  networks.boba = {
    live: true,
    chainId: 40,
    url: 'https://boba-mainnet.gateway.pokt.network/v1/lb/' + process.env.POCKET_NETWORK_KEY,
    accounts: {
      mnemonic,
    },
    tags: ['prod'],
  };

  networks.moonbeam = {
    live: true,
    chainId: 41,
    url: 'https://moonbeam-mainnet.gateway.pokt.network/v1/lb/' + process.env.POCKET_NETWORK_KEY,
    accounts: {
      mnemonic,
    },
    tags: ['prod'],
  };

  networks.optimism = {
    live: true,
    chainId: 30,
    url: 'https://optimism-mainnet.gateway.pokt.network/v1/lb/' + process.env.POCKET_NETWORK_KEY,
    accounts: {
      mnemonic,
    },
    tags: ['prod'],
  };

  networks.gnosis = {
    live: true,
    chainId: 31,
    url: 'https://poa-xdai-mainnet.gateway.pokt.network/v1/lb/' + process.env.POCKET_NETWORK_KEY,
    accounts: {
      mnemonic,
    },
    tags: ['prod'],
  };

  networks.mainnet = {
    live: true,
    url: 'https://eth-mainnet.gateway.pokt.network/v1/lb/' + process.env.POCKET_NETWORK_KEY,
    chainId: 1,
    accounts: {
      mnemonic,
    },
    tags: ['prod'],
  };
} else {
  console.warn('No hdwallet provided');
}
export default networks;
