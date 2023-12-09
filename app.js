// App.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import BowlingNFT from './contracts/BowlingNFT.json';

const App = () => {
  const [contract, setContract] = useState(null);
  const [ethUSDPrice, setEthUSDPrice] = useState(0);
  const [isSubscriber, setIsSubscriber] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const network = await provider.getNetwork();

        const contractAddress = BowlingNFT.networks[network.chainId].address;
        const bowlingNFTContract = new ethers.Contract(contractAddress, BowlingNFT.abi, signer);

        setContract(bowlingNFTContract);
      }
    };

    init();
  }, []);

  const mintNFT = async () => {
    if (contract) {
      await contract.mint();
    }
  };

  const subscribe = async () => {
    if (contract) {
      await contract.subscribe({ value: ethers.utils.parseEther('5.99') });
      setIsSubscriber(true);
    }
  };

  const unsubscribe = async () => {
    if (contract) {
      await contract.unsubscribe();
      setIsSubscriber(false);
    }
  };

  const analyzeStatistics = async (tokenId) => {
    if (contract) {
      const result = await contract.analyzeStatistics(tokenId);
      console.log(result);
    }
  };

  return (
    <div>
      <h1>Bowling NFT Platform</h1>
      <button onClick={mintNFT}>Mint NFT</button>
      {!isSubscriber ? (
        <button onClick={subscribe}>Subscribe ($5.99/month)</button>
      ) : (
        <button onClick={unsubscribe}>Unsubscribe</button>
      )}
      <p>ETH/USD Price: ${ethUSDPrice}</p>
      <button onClick={() => analyzeStatistics(1)}>Analyze Statistics for Token ID 1</button>
    </div>
  );
};

export default App;
