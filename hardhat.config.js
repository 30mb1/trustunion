require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require('hardhat-deploy');
require('hardhat-deploy-ethers');


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  namedAccounts: {
    deployer: {
      default: 0
    },
    usdt: {
      // mainnet binance USDT
      56: "0x55d398326f99059fF775485246999027B3197955"
    }
  },
  solidity: {
    version: '0.8.13',
    settings: {
      optimizer: {
        enabled: true,
        runs: 10000
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 1111,
      accounts: {
        count: 50
      }
    },
    mainnet: {
      url: "https://bsc-dataseed1.defibit.io/",
      chainId: 56,
      gasPrice: 6000000000,
      timeout: 1000000,
      // accounts: ["PRIVATE_KEY_GO_HERE"]
      // OR
      // accounts: {
      //   mnemonic: "MNEMONIC_GO_HERE",
      //   count: 50
      // }
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      timeout: 100000
    }
  }
};
