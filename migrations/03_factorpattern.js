const Counter = artifacts.require('factory');

module.exports = async (deployer) => {
    deployer.deploy(Counter);
}