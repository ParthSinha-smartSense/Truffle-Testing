const Events = artifacts.require('events');

module.exports = async (deployer) => {
    deployer.deploy(Events);
}