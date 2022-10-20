pragma solidity 0.8.17;

import "./nft.sol";



contract depositNFT {
    uint minBalance;
    NFT immutable i_nft;
    struct nftDb{
        address _owner;
        uint _id;
        uint _timestamp;
    }
    event fundChange(uint currentBalance);
    uint counter;
    uint earnings;
    address owner;
    nftDb[] public txns;
    uint lockingPeriod;
    uint interest;
    mapping(address=>uint)  index;
    constructor(string memory _name, string memory _symbol) {
        owner=msg.sender;
        lockingPeriod= 365 days;
        interest= 10 wei;  
        i_nft=  new NFT(_name, _symbol);
        minBalance=0;
    }

    modifier onlyOwner(){
        require(msg.sender==owner,"Not Owner");
        _;
    }

    function increaseBalance() onlyOwner() external payable{
         emit fundChange(address(this).balance);       
    }

    function withdrawBalance(uint _amt) onlyOwner() external payable{
        require(_amt + minBalance>= address(this).balance);
        payable(owner).transfer(_amt);
        emit fundChange(address(this).balance);
    }
    function getNFTAddress() view external returns(address){
        return address(i_nft);
    }
    function getParameters() view external returns(uint _lockingPeriod, uint _interest){
        return (lockingPeriod, interest);
    }

    
    function changeLockingPeriod(uint _lockingPeriod) onlyOwner() external{
        lockingPeriod=_lockingPeriod;
    }

    function changeInterest(uint _interest) onlyOwner() external{
        interest= _interest;
        minBalance= interest * (txns.length +1);
    }

    function changeOwner(address _owner) onlyOwner() external{
        owner=_owner;
    }
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4){
        return bytes4(IERC721Receiver.onERC721Received.selector);
    }
   
    function deposit(uint _id) external{
        address _seller= msg.sender;
        i_nft.checkOwnership(_seller,_id);
        require(minBalance<=address(this).balance,"Insufficient balance");
        minBalance+=interest;
        i_nft.safeTransferFrom(_seller,address(this),_id);
        txns.push(nftDb(msg.sender,_id,block.timestamp));
        index[msg.sender]= txns.length -1;
    }


    function showEarnings() onlyOwner() view external returns(uint){
        return earnings;
    }
    function withdraw() external payable{
        address _seller = msg.sender;
        require(txns[index[_seller]]._owner==_seller);
        uint _id = txns[index[_seller]]._id;
        i_nft.checkOwnership(address(this), _id);

        i_nft.safeTransferFrom(address(this),_seller, _id);
        if(block.timestamp- txns[index[_seller]]._timestamp>=365 days)
           {
                payable(_seller).transfer(interest);
                emit fundChange(address(this).balance);
           }
        else 
            earnings+=interest;
        delete txns[index[_seller]];
        delete index[_seller];
        minBalance-=interest;
    }

    function showTimeRemaining() view external returns(uint day, uint hour){
        day=(txns[index[msg.sender]]._timestamp + 365 days - block.timestamp)/1 days;
        hour=(txns[index[msg.sender]]._timestamp + 365 days - block.timestamp)%1 days;
    }
}
