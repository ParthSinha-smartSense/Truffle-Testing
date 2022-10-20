const deposit=artifacts.require('deposit')
const erc=artifacts.require('token')
const truffleAssert = require('truffle-assertions');
const {
    time
  } = require('@openzeppelin/test-helpers');
    contract('token', async(accounts)=>{
    let currentTime;
    var instance;
    var instance1;
    before(async()=>{
        instance = await erc.deployed();
        instance1= await deposit.deployed(instance.address,{from:accounts[0]});
    });
    it("deployed correctly",async()=>{
        assert(instance.address!='');
    });
    it("deposit function deployed correctly",async()=>{
        assert(instance1.address!='');
    });
    
    it("owner minting 100000000 tokens", async()=>{
        await  instance.ownerCoins({from:accounts[0]});
        await  instance.approve(instance1.address,1000000000,{from:accounts[0]});

       await instance.balanceOf(accounts[0]).then(x=>assert(x.toString()==100000000));
        
    })

    it("give some coints to other account",async()=>{
        await instance.someCoins({from:accounts[1]});
        instance.balanceOf(accounts[1]).then(x=>assert(x.toString()==1000));
    });

    it("owner can change ownership",async()=>{
        await instance1.changeOwner(accounts[1],{from:accounts[0]});
    });

    it("Others can't change ownership",async()=>{
        await truffleAssert.reverts(instance1.changeOwner(accounts[1],{from:accounts[0]}));  
    });
   
    it("deposit tokens" , async()=>{  
        await instance1.changeOwner(accounts[0],{from:accounts[1]});
        await instance.approve(instance1.address,1000,{from:accounts[1]});
        await instance1.depositToken(1000,{from:accounts[1]});
         currentTime= (await time.latest());
    });

    it("early withdrawl", async()=>{
        currentTime.add(time.duration.years(1))
        await instance1.withdrawToken({from:accounts[1]});
        instance.balanceOf(accounts[1]).then(x=>assert(x.toString()==800));

    });

    it("on-time withdrawl",async()=>{
        await instance.someCoins({from:accounts[2]});
        await instance.approve(instance1.address,1000,{from:accounts[2]});
        await instance1.depositToken(1000,{from:accounts[2]});
        let duration = time.duration.days(365);
        await time.increase(duration);
        await instance1.withdrawToken({from:accounts[2]});
        let a= await instance.balanceOf(accounts[2]);
       // console.log(a.toString());

       // assert(a.toString()==1100);
       instance.balanceOf(accounts[2]).then(x=>assert(x.toString()==1100));

    });

    it("364 days withdrawl",async()=>{
        await instance.someCoins({from:accounts[3]});
        await instance.approve(instance1.address,1000,{from:accounts[3]});
        await instance1.depositToken(1000,{from:accounts[3]});
        let duration = time.duration.days(364);
        duration = duration+ time.duration.hours(23);
        await time.increase(duration);
        //await time.increase(duration1);
        await instance1.withdrawToken({from:accounts[3]});
        //instance.balanceOf(accounts[3]).then(x=>assert(x.toString()==800));

    });

    it(" 366 days withdrawl ", async()=>{
        await instance.someCoins({from:accounts[4]});
        await instance.approve(instance1.address,1000,{from:accounts[4]});
        await instance1.depositToken(1000,{from:accounts[4]});
        let duration = time.duration.days(366);
        let duration1 = time.duration.hours(1);
        let currentTime= time.latest();
       
        await time.latest().then(x=>  time.increaseTo(x.add(duration).add(duration1)));
        await instance1.withdrawToken({from:accounts[4]});
        instance.balanceOf(accounts[4]).then(x=>assert(x.toString()==1100));

    });
    // it("temp", async()=>{
    //     currentTime= (await time.latest());
        
    //     let advance= time.duration.days(364);
        
    //     time.increaseTo(advance+currentTime);
    //   assert(time.latest()- currentTime >= advance);
    // });
});