// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {
    address payable public owner;
    uint public mylen=0;

    constructor() payable {
        mylen=0;
        owner = payable(msg.sender);
    }

    function push(uint x) public {
        mylen = mylen+1;
    }
    function pop() public {
        mylen = mylen-1;
    }
    function reset() public {
        mylen = 0;
    }
    function getlen() public view returns(uint) {
        return mylen;
    }
}
