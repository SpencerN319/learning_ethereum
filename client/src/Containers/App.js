import React, {
  Fragment,
  useState,
  useEffect,
} from 'react';
import Authenticator from '../contracts/Authenticator.json';
import Kyc from '../contracts/Kyc.json';
import getWeb3 from '../utils/getWeb3';
import './App.css';
import CreateOTP from './CreateOTP';

const App = () => {
  const [addr, setAddr] = useState('');
  const [state, setState] = useState({
    web3: null,
    owner: null,
    authContract: null,
    kycContract: null,
  });

  useEffect(() => {
    try {
      const setup = async () => {
        const web3 = await getWeb3();
        const [owner] = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const authAddress = Authenticator.networks[networkId] && Authenticator.networks[networkId].address;
        const kycAddress = Kyc.networks[networkId] && Kyc.networks[networkId].address;
        const authContract = new web3.eth.Contract(Authenticator.abi, authAddress);
        const kycContract = new web3.eth.Contract(Kyc.abi, kycAddress);
        await kycContract.methods.setKycCompleted(owner).send({from: owner});
        setState({web3, owner, authContract, kycContract});
      };

      setup()
          .catch((error) => console.log(error));
    } catch (error) {
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  }, []);

  const checkKycCompleteHandler = async () => {
    await state.kycContract.methods.kycCompleted(addr).call()
        .then((response) => console.log(response))
        .catch((error) => alert(error.message));
  };

  return (
    <div className="App">
      { state ? (
        <Fragment>
          <h1>Good to Go!</h1>
          <p>Your Truffle Box is installed and ready.</p>
          <h2>Smart Contract Example</h2>
          <p>
            If your contracts compiled and migrated successfully, below will show
            a stored value of 5 (by default).
          </p>
          <div>
            <input type="text" placeholder="Account" onChange={(event) => setAddr(event.target.value)}/>
            <button onClick={() => checkKycCompleteHandler()}>verify</button>
          </div>
          <div/>
          <CreateOTP />
        </Fragment>
      ) : (
          <div>Loading Web3, accounts, and contract...</div>
      )}
    </div>
  );
};


export default App;
