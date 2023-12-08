// App.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import BowlingNFT from './contracts/BowlingNFT.json';

const App = () => {
  const [contract, setContract] = useState(null);
  const [ethUSDPrice, setEthUSDPrice] = useState(0);

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

  const getETHUSDPrice = async () => {
    if (contract) {
      const price = await contract.getETHUSDPrice();
      setEthUSDPrice(price);
    }
  };

  return (
    <div>
      <h1>Bowling NFT Platform</h1>
      <button onClick={mintNFT}>Mint NFT</button>
      <button onClick={getETHUSDPrice}>Get ETH/USD Price</button>
      <p>ETH/USD Price: ${ethUSDPrice}</p>
    </div>
  );
};

export default App;
