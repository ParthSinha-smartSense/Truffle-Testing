const counter=artifacts.require('counter.sol')

contract("counter",()=>{
    it('should increment',async()=>{
        const count= await counter.new();
        await count.inc();
        data = await count.count();
        assert(data.toString()==='1');
    });

    it('should decrement',async()=>{
        const count= await counter.new();
        // await count.inc();
        count.dec()
        .then(()=>{
            assert(false);
        })
        .catch(()=>
        {
            assert(true);
        })  ;      
        data = await count.count();
        assert(data.toString()==='0');
    });

    
});