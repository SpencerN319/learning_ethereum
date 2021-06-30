import React, {
  Fragment,
  useState,
  useEffect,
} from 'react';
import SimpleStorageContract from './contracts/SimpleStorage.json';
import getWeb3 from './utils/getWeb3';
import './App.css';

const App = () => {
  const [state, setState] = useState({
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
  });

  useEffect(() => {
    try {
      const setup = async () => {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SimpleStorageContract.networks[networkId];
        const instance = new web3.eth.Contract(
            SimpleStorageContract.abi,
            deployedNetwork && deployedNetwork.address,
        );

        setState({...state, web3, accounts, contract: instance});
      };

      setup().catch((error) => console.log(error));
    } catch (error) {
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  }, []);

  useEffect(() => {
    runExample();
  }, [state.web3]);

  const runExample = async () => {
    const {accounts, contract} = state;
    await contract.methods.set(5).send({from: accounts[0]});
    const response = await contract.methods.get().call();

    setState({...state, storageValue: response});
  };

  return (
    <div className="App">
      { state.web3 ? (
        <Fragment>
          <h1>Good to Go!</h1>
          <p>Your Truffle Box is installed and ready.</p>
          <h2>Smart Contract Example</h2>
          <p>
            If your contracts compiled and migrated successfully, below will show
            a stored value of 5 (by default).
          </p>
          <p>Try changing the value stored on <strong>line 42</strong> of App.js.</p>
          <div>The stored value is: {state.storageValue}</div>
        </Fragment>
    ) : (
        <div>Loading Web3, accounts, and contract...</div>
    )}
    </div>
  );
};


export default App;
