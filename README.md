# Notes:

## Security

### Re-entrancy:
<p>
    Re-entrancy occurs when a smart contract makes an external call that is  
    waiting to be resolved, this call may be to a malicious contract that will 
    then exploit the vulnerability of your contract.
</p>

```aidl
// re-entrant code
function withdraw() external {
    uint256 amount = balances[msg.sender];
    (bool success, ) = msg.sender.call.value(amount)("");
    require(success); /* requires the contract to resolve */
    balances[msg.sender] = 0;
}

// non re-entrant code
function withdraw() external {
    uint256 amount = balances[msg.sender];
    balances[msg.sender] = 0;
    (bool success, ) = msg.sender.call.value(amount)("");
    require(success);
}
```
<p>
    This design pattern is known as the "Checks-Effects_interactions." This 
    helps protect against re-entrancy.
</p>
