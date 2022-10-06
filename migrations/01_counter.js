const Counter = artifacts.require('counter');

module.exports = async (deployer) => {
    deployer.deploy(Counter);
}