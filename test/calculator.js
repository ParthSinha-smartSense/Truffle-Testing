const counter=artifacts.require('Calculator.sol')
const truffleAssert = require('truffle-assertions');

contract('Calculator',async()=>{
     before(async()=>{
        instance = await counter.deployed();
    });

    it(" initial value",async()=>{
        assert(await instance.a.call()== await instance.b.call()==0);
    });
  
    it('correct set ', async()=>{
        await instance.set(2,3);
        assert(await instance.a()==2 && await instance.b()==3);
    });

    it('set Max', async()=>{
        await instance.setAToMax();
       await truffleAssert.fails(instance.add());
     
    });
    it('correct addition', async()=>{
        await instance.set(3,2);
        assert(await instance.add()==5);
    });
    it('correct multiplication',async()=>{
        assert(await instance.mul()==6);
    });
    it('correct subtraction',async()=>{
        assert(await instance.sub()==1);
    });

    it('correct division',async()=>{
        assert(await instance.div()==1);
    });

    it('underflow',async()=>{
        await instance.set(2,3);
        await truffleAssert.fails(instance.sub());
    });

    it('overflow',async()=>{
        await instance.setAToMax();
        await truffleAssert.fails(instance.add());
    });
});