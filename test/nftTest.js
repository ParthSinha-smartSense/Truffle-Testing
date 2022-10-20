const nftContract=artifacts.require('NFT')
const depositContract=artifacts.require('depositNFT')

const truffleAssert = require('truffle-assertions');
const {
    time
  } = require('@openzeppelin/test-helpers');

  contract('depositNFT', async(accounts)=>{
    var nft
    var instance

    before(async()=>{
        instance = await depositContract.deployed();       
    });

    it("deployed correctly",async()=>{
        assert(instance.address!='');  
    });

    it("NFT contract deployed succesfully",async()=>{
        nft= await nftContract.at(await instance.getNFTAddress.call());
        assert(nft.address!='');       
    });

    it("transfer eth to contract ", async()=>{
        await instance.increaseBalance.sendTransaction({from:accounts[0],value:"100"})
     .then(result=>truffleAssert.eventEmitted(result,"fundChange",async(ev)=>assert(ev.currentBalance.toString()== "100")))    
    });    

    it("withdraw eth from contract",async()=>{
      //  await instance.increaseBalance.sendTransaction({from:accounts[0],value:"100"})

        await instance.withdrawBalance.sendTransaction(100,{from:accounts[0]})
        .then(result=>truffleAssert.eventEmitted(result,"fundChange",async(ev)=>assert(ev.currentBalance.toString()== "0")))    
    });

    it("deposit nft", async()=>{
        await instance.increaseBalance.sendTransaction({from:accounts[0],value:"100"})
        await nft.mintNFT.sendTransaction(1,{from:accounts[1]})
        await nft.approve.sendTransaction(instance.address,1,{from:accounts[1]})
        await instance.deposit.sendTransaction(1,{from:accounts[1]})
    });

    it("withdraw nft before time",async()=>{
        await instance.withdraw({from:accounts[1]}).then(result=>truffleAssert.eventNotEmitted(result, 'fundChange'));
    })

   
    
    it("withdraw after 365 days",async()=>{
        await nft.mintNFT.sendTransaction(0,{from:accounts[1]})
        await nft.approve.sendTransaction(instance.address,0,{from:accounts[1]})
        await instance.deposit.sendTransaction(0,{from:accounts[1]})
        let duration = time.duration.days(365)
        await time.increase(duration)
        await instance.withdraw.sendTransaction({from:accounts[1]}).then(result=>truffleAssert.eventEmitted(result,"fundChange",async(ev)=>assert(ev.currentBalance.toString()== "90")));
    })
    
    it("show earnings",async()=>{
        await instance.showEarnings.call({from:accounts[0]}).then(x=>assert(x.toString()=="10"))
    })    

    it("working of onlyOwner modifier", async()=>{
        await truffleAssert.fails( instance.showEarnings.call({from:accounts[1]}))
    })

    it("get NFT address", async()=>{
        await instance.getNFTAddress.call().then(x=>assert(x==nft.address))
    })

    it("get Parameters",async()=>{
        await instance.getParameters.call().then(ev=> assert(ev._interest.toString()==10 && ev._lockingPeriod.toString()==365* 24*60*60) )
    })

    it("minBalance condition overflow",async()=>{
        await nft.mintNFT.sendTransaction(11,{from:accounts[4]})
        await nft.approve.sendTransaction(instance.address,11,{from:accounts[4]})
        await instance.deposit.sendTransaction(11,{from:accounts[4]})
        await truffleAssert.fails(instance.withdrawBalance.sendTransaction(100,{from:accounts[4]}))
    })

    it("minBalance condition ",async()=>{
        
        truffleAssert.passes(instance.withdrawBalance.sendTransaction(80,{from:accounts[0]}))
     })

    it('show time remaining',async()=>{
        let duration = time.duration.days(364)
        await time.increase(duration)
        await instance.showTimeRemaining.call({from:accounts[4]}).then(ev=>assert(ev.day.toString()==1))
    })

    it("change time period",async()=>{
        await instance.changeLockingPeriod.sendTransaction(350*24*60*60,{from:accounts[0]})
        await instance.getParameters.call()
        .then(ev=> assert( ev._lockingPeriod.toString()== time.duration.days(350)) )

    })

    it("change interest",async()=>{
        await instance.changeInterest.sendTransaction(15,{from:accounts[0]})
        await instance.getParameters.call()
        .then(ev=> assert( ev._interest.toString()== 15) )
    })

    it("change owner", async()=>{
        await instance.changeOwner.sendTransaction(accounts[1],{from:accounts[0]})
        await truffleAssert.fails( instance.showEarnings.call({from:accounts[0]}))
    })

    
});