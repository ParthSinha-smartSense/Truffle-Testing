// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract token is ERC20{
   event temp(address);
    constructor() ERC20("SSTest Token", "SSTest") {
        
        
    }   

    function ownerCoins() external{
        _mint(msg.sender, 100000000 * 10 ** decimals());
    }    

    function someCoins() external{
        _mint(msg.sender,1000);
    }
}   