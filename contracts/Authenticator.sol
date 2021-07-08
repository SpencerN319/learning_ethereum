// contracts/Authenticator.sol
//SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Kyc.sol";

contract Authenticator is Ownable {

    Kyc kyc;
    uint256 index;
    mapping (uint256 => bool) keys;

    constructor(Kyc _kyc) {
        index = uint256(0);
        kyc = _kyc;
    }

    function requestPassword() public returns(uint256) {
        require(kyc.kycCompleted(msg.sender), "Error: Kyc not completed");
        keys[index] = true;
        uint256 returnIndex = index;
        index++;
        return returnIndex;
    }

    function validatePassword(uint256 _index) public returns(bool){
        require(kyc.kycCompleted(msg.sender), "Error: Kyc not completed");
        require(keys[_index] == true, "Error: Invalid key");
        keys[_index] = false;
        return true;
    }
}
