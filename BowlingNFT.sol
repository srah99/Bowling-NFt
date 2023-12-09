// BowlingNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract BowlingNFT is ERC721Enumerable, Ownable {
    AggregatorV3Interface internal priceFeed;
    mapping(uint256 => string) public metadata;
    mapping(address => bool) public subscribers;

    uint256 public subscriptionCost = 5.99 ether;

    event SubscriptionPaid(address indexed subscriber, uint256 amount);
    event MetadataUpdated(uint256 tokenId, string updatedMetadata);

    constructor() ERC721("BowlingNFT", "BNFT") {
        priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e); // Example Chainlink ETH/USD feed
    }

    function mint() external onlyOwner {
        _safeMint(msg.sender, totalSupply() + 1);
    }

    function subscribe() external payable {
        require(msg.value == subscriptionCost, "Incorrect subscription cost");
        subscribers[msg.sender] = true;
        emit SubscriptionPaid(msg.sender, msg.value);
    }

    function unsubscribe() external {
        subscribers[msg.sender] = false;
    }

    function analyzeStatistics(uint256 tokenId) external view returns (string memory) {
        // Perform statistical analysis based on the tokenId
        // Example: Return a string with statistical results
        return string(abi.encodePacked("Statistics for tokenId ", tokenId));
    }

    function updateMetadata(uint256 tokenId, string calldata newMetadata) external onlyOwner {
        metadata[tokenId] = newMetadata;
        emit MetadataUpdated(tokenId, newMetadata);
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
