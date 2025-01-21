// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract MoCMock {
    address payable public owner;
    uint256 public qACLockedInPending = 0;
    bool public emaBool;
    uint256 private bts = 1; // bts == 0 -> cond pub TRUE
    uint256 public nextTCInterestPayment;

    constructor() payable {
        owner = payable(msg.sender);
        nextTCInterestPayment = block.number + 1000; // currentBlock > nextTCInterestPayment -> cond pub TRUE
    }

    // Reset all values to match cond pub == FALSE
    function reset() public {
        qACLockedInPending = 0;
        emaBool = false;
        bts = 1; // bts == 0 -> cond pub TRUE
        nextTCInterestPayment = block.number + 1000; // currentBlock > nextTCInterestPayment -> cond pub TRUE
    }

    function setQACLockedInPending(uint256 val) external {
        qACLockedInPending = val;
    }

    function shouldCalculateEma() public view returns (bool) {
        return emaBool;
    }

    function setEmaBool(bool val) external {
        emaBool = val;
    }

    function getBts() external view returns (uint256) {
        return bts;
    }

    function setBts(uint256 val) external {
        bts = val;
    }

    function setNextTCInterestPayment(uint256 val) external {
        nextTCInterestPayment = val;
    }
}
