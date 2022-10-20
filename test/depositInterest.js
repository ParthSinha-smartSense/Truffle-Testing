const deposit=artifacts.require('depositInterest')
const erc=artifacts.require('token')
const ercI=artifacts.require('interestToken')

const truffleAssert = require('truffle-assertions');
const {
    time
  } = require('@openzeppelin/test-helpers');

  contract('token', async(accounts)=>{
    var principal
    var int
    var instance
    let currentTime

    before(async()=>{
         principal = await erc.deployed();
         int = await ercI.deployed();
         instance= await deposit.deployed();
    });

    it("deployed correctly",async()=>{
        assert(instance.address!='');    });

    it("owner minting 100000000 tokens", async()=>{
        await  int.ownerCoins({from:accounts[0]});
       await int.balanceOf(accounts[0]).then(x=>assert(x.toString()==100000000));
        
    })

    it("owner can change ownership",async()=>{
        await int.changeOwner(accounts[1],{from:accounts[0]});
    });

    it("Others can't change ownership",async()=>{
        await truffleAssert.reverts(int.changeOwner(accounts[1],{from:accounts[0]}));  
    });

    it("deposit tokens" , async()=>{  
        await int.changeOwner(accounts[0],{from:accounts[1]});
        await  int.approve(instance.address,1000000000,{from:accounts[0]});
        await principal.approve(instance.address,1000,{from:accounts[1]});
        await principal.someCoins({from:accounts[1]});
        await instance.depositToken(1000,{from:accounts[1]});
         currentTime= (await time.latest());

    });

    it("on-time withdrawl",async()=>{
        let duration = time.duration.days(365);
        await time.increase(duration);
        await instance.withdrawToken({from:accounts[1]});
        let a= await principal.balanceOf(accounts[1])
        let b = await int.balanceOf(accounts[1])
      
   
        assert(a.toString()==1000 && b.toString()==100)
        
    });
});