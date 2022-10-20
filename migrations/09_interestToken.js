const cal= artifacts.require('interestToken');

module.exports = async (deployer) => {
    deployer.deploy(cal);
}

