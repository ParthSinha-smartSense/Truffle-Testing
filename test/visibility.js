const vis=artifacts.require('Visibility')
const truffleAssert = require('truffle-assertions');

contract('Visibility', async()=>{
    before(async()=>{
        instance = await vis.deployed();
    });
    it(" deployed correctly",async()=>{
        assert(instance.address!='');
    });

    it('accessing private variable', async()=>{
        truffleAssert.fails(instance.priv());
    });
});