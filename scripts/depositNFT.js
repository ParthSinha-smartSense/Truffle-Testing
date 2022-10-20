const token= artifacts.require('depositNFT');
const token1= artifacts.require('NFT');
module.exports = async function(callback) {
    try {
        const instance= await token.deployed()
        const accounts= await web3.eth.getAccounts()
        const tokenAddress= await instance.getNFTAddress.call()
        instance.increaseBalance.sendTransaction({from:accounts[0],value:"10"})
        var nft = await token1.at(tokenAddress);
        await nft.mintNFT.sendTransaction(0,{from:accounts[1]})
        await nft.approve.sendTransaction(instance.address,0,{from:accounts[1]})
        await instance.deposit.sendTransaction(0,{from:accounts[1]})
        await instance.showTimeRemaining.call({from:accounts[1]}).then(x=>console.log(x))
        await instance.withdraw.sendTransaction({from:accounts[1]});
        //await instance.withdrawBalance.sendTransaction({from:accounts[0]})
        
    }
    catch(error) {
      console.log(error)
    }
  
    callback()
  }