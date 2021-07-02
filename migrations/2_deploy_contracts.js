require("dotenv").config({path: "../.env"});
let Authenticator = artifacts.require("./Authenticator.sol");
let Kyc = artifacts.require("./Kyc.sol");

module.exports = async function (deployer) {
  await deployer.deploy(Kyc);
  await deployer.deploy(Authenticator(Kyc.address))
};
