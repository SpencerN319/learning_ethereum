const Authenticator = artifacts.require("./Authenticator.sol");

contract("Authenticator", accounts => {
  it("...should store the value 89.", async () => {
    const authenticatorInstance = await Authenticator.deployed();

    assert.equal(1, 1, "You need to write tests.");
  });
});
