const store=artifacts.require('AdvanceStorage');

contract('AdvanceStorage',()=>{
    before(async()=>{
    instance= await store.deployed();
    });

    it("Contract deployed",()=>{
        assert(instance.address!='')
    });

    it("Initialized correct",async ()=>{
        let data= await instance.getLength();
        assert(data==0);
    });

    it("single insertion correct",async()=>{
       await instance.add(1);
        let data= await instance.getArray();
        assert(data[0]==1);
        assert(data.length==1);
    });
    
    it("returning correct length",async()=>{
        let data= await instance.getArray();
        
         assert(data.length==1);
     });
    it("multiple insertion correct",async()=>{
        // await instance.add(10);
        // await instance.add(2);
        // await instance.add(3);
        // await instance.add(13);
        //  let data= await instance.getArray();
        //     if(data[0]==1 || data[1]==10 ||data[2]==2 ||data[3]==3 ||data[4]==13 ||data.length==5 )
        //         flag=true;
        //    assert(flag);
        let data= await instance.getArray();

        //console.log(data);
        let arr=[2,3,4,5];
        for(let i;i< arr.length;i++)
            await instance.add(arr[i]);
        for(let i;i<data.length;i++)
        assert(data[i]==i);
    });
});
