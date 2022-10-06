// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract deposit{
    ERC20 immutable  _token;
    address temp;
    address owner;
    struct txn{
        uint amount;
        uint time;
    }

    mapping(address=> bool) deposited;
    mapping(address=> txn) txns;

    constructor(address _addr){
        _token= ERC20(_addr);
        owner=msg.sender;
        
    }

    modifier onlyOwner(){
        require(msg.sender== owner,"Not Owner");
        _;
    }

    function changeOwner(address _addr) onlyOwner() external {
        owner=_addr;
    }
    function depositToken(uint _amt) external{
        require(_amt>999,"Insufficient amount");
        require(_token.balanceOf(msg.sender)>=_amt,"Insufficient balance");
        deposited[msg.sender]=true;
        txns[msg.sender]=txn(_amt,block.timestamp);
        temp=msg.sender;
        _token.transferFrom(msg.sender, address(this), _amt);
    }

    function withdrawToken() external {
        require(deposited[msg.sender],'Not deposited');
        deposited[msg.sender]=false;
        txn memory txnWithdraw= txns[msg.sender];
        if(block.timestamp - txnWithdraw.time >= 365 days){
            _token.transfer(msg.sender,txnWithdraw.amount);
            _token.transferFrom(owner,msg.sender,txnWithdraw.amount /10);
        }
        else{
            _token.transfer(msg.sender,txnWithdraw.amount - txnWithdraw.amount/5  );

        }
    }

}