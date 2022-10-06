const Counter = artifacts.require('AdvanceStorage');

module.exports = async (deployer) => {
    deployer.deploy(Counter);
}