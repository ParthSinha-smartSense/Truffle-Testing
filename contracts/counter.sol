// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

contract counter
{

 uint public count;
 function inc() public {
     count+=1;
 }

    function dec() public{
        count-=1;
    }
}
