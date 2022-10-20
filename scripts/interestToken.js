const token= artifacts.require('token');
const interestToken= artifacts.require('interestToken');

const Deposit= artifacts.require('deposit');

module.exports = async function(callback) {
    try {
        const accounts= await web3.eth.getAccounts()
        const token1= await token.deployed()
        const token2= await interestToken.deployed()
        const deposit= await Deposit.deployed()
    }
    catch(error) {
      console.log(error)
    }
  
    callback()
  }