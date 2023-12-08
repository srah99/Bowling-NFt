
// BowlingNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract BowlingNFT is ERC721Enumerable {
    address public owner;
    AggregatorV3Interface internal priceFeed;

    constructor() ERC721("BowlingNFT", "BNFT") {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e); // Example Chainlink ETH/USD feed
    }

    function mint() external {
        require(msg.sender == owner, "Only the owner can mint");
        _safeMint(msg.sender, totalSupply() + 1);
    }

    function getETHUSDPrice() public view returns (int) {
        (, int price, , ,) = priceFeed.latestRoundData();
        return price;
    }
}
