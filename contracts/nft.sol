pragma solidity 0.8.17;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
contract NFT is ERC721{
    constructor(string memory _name, string memory _symbol)ERC721(_name,_symbol){

    }

    function mintNFT(uint _id) external{
        _mint(msg.sender,_id);
    }

    function burnNFT(uint _id) external{
        _burn(_id);
    }

    function checkOwnership(address _owner,uint _id) public view{
        require(_exists(_id),"Invalid ID");
        require(_isApprovedOrOwner(_owner,_id),"Not authorised to sell");
    }

}