const vis= artifacts.require('Visibility');

module.exports = async (deployer) => {
    deployer.deploy(vis);
}