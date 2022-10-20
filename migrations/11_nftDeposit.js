const token= artifacts.require('depositNFT');


module.exports = async (deployer) => {
    deployer.deploy(token,"NFT interest","int");
}
