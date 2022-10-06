const eventContract = artifacts.require("eventContract");
const truffleAssert = require('truffle-assertions');

contract('event' , async () => {
    var contractInstance;
    
    before(async () => {
      contractInstance = await  eventContract.deployed();
    });
  
    it('should deploy eventContract properly', async () => {
      assert(contractInstance.address != '' );
      console.log("Event Contract is deployed at : " , contractInstance.address);
    });
    it('should emit Event' , async () => {
        await contractInstance.callEvent("Error in Calling").then(async(res)=>console.log(res.logs[0].args));
        await contractInstance.callEvent("Erorr in Calling").then(async (result) => { 
          // truffleAssert.prettyPrintEmittedEvents(result);
          //console.log(result.logs);
          await truffleAssert.eventEmitted(result, 'functionCalled',async (ev) => {  
            console.log(ev);
            
          });
        });
      });
    });