require('dotenv').config();
require("@nomicfoundation/hardhat-chai-matchers");


const ALCHEMY_KEY=process.env.ALCHEMY_KEY;
const GOERLI_PRIVATE_KEY=process.env.GOERLI_KEY;


/** @type import('hardhat/config').HardhatUserConfig */

 /** LOCAL TEST ON HARDHAT NETWORK */ 




 module.exports = {
  //defaultNetwork:"goerli",
  networks: {
    hardhat: {
      chainId:31337,
      
      gasPrice:8000000000,
      gas: 1000000000,
      gasMultiplier:1,
      blockGasLimit:1000000000,
      allowUnlimitedContractSize:false
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  namedAccounts:{
    deployer:0,
    lawyer:1,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
 }
