// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract interestToken is ERC20{
    event temp(address);
    address owner;
    constructor() ERC20("interest", "int") {
        owner=msg.sender;        
    }   
    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    modifier onlyOwner(){
        require(msg.sender==owner);
        _;
    }
    function changeOwner(address _newOwner) onlyOwner() external {
        owner=_newOwner;
    }
    function ownerCoins() onlyOwner() external{
        _mint(msg.sender, 100000000 );
    }    

    function someCoins() external{
        _mint(msg.sender,1000);
    }
}   