const token= artifacts.require('token');
const deposit= artifacts.require('deposit');

module.exports = async (deployer) => {
    deployer.deploy(deposit,token.address);
}

