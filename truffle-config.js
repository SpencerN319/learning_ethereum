require("dotenv").config({path: "./.env"});
const path = require("path");
const WalletProvider = require("@truffle/hdwallet-provider");
const Mnemonic = process.env.MNEMONIC;

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop:  {
      provider: () => new WalletProvider({
        mnemonic: {
          phrase: Mnemonic,
        },
        providerOrUrl: "http://127.0.0.1:7545"
      }),
      network_id: "5777"
    },
    infura_goerli: {
      provider: () => new WalletProvider({
        mnemonic: {
          phrase: Mnemonic,
        },
        providerOrUrl: "https://goerli.infura.io/v3/0b96a32b7471416ca3f2e1875f5f3ae5",
      }),
      network_id: "6284"
    },
    infura_ropsten: {
      provider: () => new WalletProvider({
        mnemonic: {
          phrase: Mnemonic,
        },
        providerOrUrl: "https://ropsten.infura.io/v3/0b96a32b7471416ca3f2e1875f5f3ae5",
        numberOfAddresses: 1,
        sharedNonce: true,
        derivationPath: "m/44'/1'/0'/0"
      }),
      network_id: "3"
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
