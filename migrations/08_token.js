const cal= artifacts.require('token');

module.exports = async (deployer) => {
    deployer.deploy(cal);
}

