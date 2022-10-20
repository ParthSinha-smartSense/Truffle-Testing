const token1= artifacts.require('token');
const token2= artifacts.require('interestToken');

const deposit= artifacts.require('depositInterest');

module.exports = async (deployer) => {
    deployer.deploy(deposit,token1.address,token2.address);
}
