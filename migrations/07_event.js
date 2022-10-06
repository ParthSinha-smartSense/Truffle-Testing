const vis= artifacts.require('eventContract');

module.exports = async (deployer) => {
    deployer.deploy(vis);
}