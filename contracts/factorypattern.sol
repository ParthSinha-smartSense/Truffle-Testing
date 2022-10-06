// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;
contract factory{
car[] public cars;
address[] public addr;
event newCar(address indexed contractAddress, address Owner);
uint index;
function createChild(address _addr, uint _x) public{
car temp= new car(_addr, _x);
addr.push(address(temp));
cars.push(temp);
emit newCar( address(temp),_addr);
}

}

contract car{
    uint public time;
    address public owner;
    uint public cost;
    
    constructor(address x, uint y)  {
        time=block.timestamp;
        owner=x;
        cost=y;
    }
    function getCar() public view returns (uint, address, uint){
        return (time,owner,cost);
    }
}