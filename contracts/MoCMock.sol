// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract MoCMock {
    address payable public owner;
    uint public mylen=0;
    uint256 public qACLockedInPending = 0;
    bool public emaBool;
    uint256 private bts = 0;
    uint256 public nextTCInterestPayment;

    constructor() payable {
        mylen=0;
        owner = payable(msg.sender);
        nextTCInterestPayment = block.number;
    }

    function push(uint) public {
        mylen = mylen+1;
    }
    function pop() public {
        mylen = mylen-1;
    }
    function reset() public {
        mylen = 0;
        qACLockedInPending = 0;
        emaBool = false;
        bts = 0;
        nextTCInterestPayment = block.number;
    }
    function getlen() public view returns(uint) {
        return mylen;
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
