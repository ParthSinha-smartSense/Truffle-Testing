// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

contract events{
    event newNum(uint indexed num, uint time, uint indexed anotherNum);

    function callEvent(uint num, uint anotherNum) public {
        emit newNum(num, block.timestamp, anotherNum);
    }
}