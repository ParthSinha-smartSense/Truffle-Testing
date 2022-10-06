const cal= artifacts.require('Calculator');

module.exports = async (deployer) => {
    deployer.deploy(cal);
}