// This is an example test file. Hardhat will run every *.js file in `test/`,
// so feel free to add new ones.

// Hardhat tests are normally written with Mocha and Chai.

// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage of Hardhat Network's snapshot functionality.
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");


describe("Inheritance", function () {
  
  async function deployTokenFixture() {
    // Get the ContractFactory and Signers here.
    const InheritanceFactory = await ethers.getContractFactory("Inheritance");
    const [assetOwner, lawyer, addr1, addr2,addr3] = await ethers.getSigners();

   
    const Inheritance = await InheritanceFactory.deploy();

    await Inheritance.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { InheritanceFactory, Inheritance, assetOwner, lawyer, addr1, addr2 , addr3};
  }

  // You can nest describe calls to create subsections.
  describe("Deployed Inheritance Contract", function () {
    
    it("Should set the right lawyer", async function () {
      
      const { Inheritance, lawyer} = await loadFixture(deployTokenFixture);
      await Inheritance.assignAsset(lawyer.address,{value:ethers.utils.parseEther("6")})
      expect(await Inheritance.lawyer()).to.equal(lawyer.address);
    });  


    it("Revert Error if the AssetOwner assign money more than the contract money",async ()=>{
      const { Inheritance,assetOwner,lawyer,addr1,addr2,addr3} = await loadFixture(deployTokenFixture);
      
      await Inheritance.assignAsset(lawyer.address,{value:ethers.utils.parseEther("8")})
      await Inheritance.setInheritance(addr1.address,ethers.utils.parseEther("4"))
      
      await Inheritance.setInheritance(addr2.address,ethers.utils.parseEther("4"))
   
      await expect(Inheritance.setInheritance(addr3.address,1)).to.be.revertedWith("Insufficient Funds");
     
    })
 
    
    it("Check Balance after lawyer and addr1 payout",async()=>{
      const { Inheritance,assetOwner,lawyer,addr1} = await loadFixture(deployTokenFixture);
      await Inheritance.assignAsset(lawyer.address,{value:ethers.utils.parseEther("8")})
      await Inheritance.setInheritance(addr1.address,ethers.utils.parseEther("8"))
      await Inheritance.connect(lawyer).hasDeceased();
      expect(await Inheritance.fortune()).to.equal(0);
     
    })
   
    it("Revert Error if other people called payout()",async()=>{
      const { Inheritance,lawyer,addr1,addr2,addr3} = await loadFixture(deployTokenFixture);
      await Inheritance.assignAsset(lawyer.address,{value:ethers.utils.parseEther("8")})
      await Inheritance.setInheritance(addr1.address,ethers.utils.parseEther("2"))
      await Inheritance.setInheritance(addr2.address,ethers.utils.parseEther("4"))
      await Inheritance.setInheritance(addr3.address,ethers.utils.parseEther("2"))
      await expect(Inheritance.connect(addr1).hasDeceased()).to.be.revertedWith("Only the Lawyer is allowed");
    })

    it("Revert error if payout() is called when there is still money in the contract",async()=>{
      const { Inheritance,lawyer,addr1,addr2} = await loadFixture(deployTokenFixture);
      await Inheritance.assignAsset(lawyer.address,{value:ethers.utils.parseEther("8")})
      await Inheritance.setInheritance(addr1.address,ethers.utils.parseEther("2"))
      await Inheritance.setInheritance(addr2.address,ethers.utils.parseEther("4"))
      await expect(Inheritance.connect(lawyer).hasDeceased()).to.be.revertedWith("Left over fund not assigned to the Family Wallet");
         
    })
    it("Emit Transfer event",async()=>{
      const { Inheritance,assetOwner, lawyer,addr1} = await loadFixture(deployTokenFixture);
      await Inheritance.assignAsset(lawyer.address,{value:ethers.utils.parseEther("8")})
      await Inheritance.setInheritance(addr1.address,ethers.utils.parseEther("8"))
     
      await expect(Inheritance.connect(lawyer).hasDeceased()).to.emit(Inheritance,"Transfer")
      .withArgs(assetOwner.address,addr1.address,ethers.utils.parseEther("8"));
       
    
     
    })


    it("Revert error if setInheritance() is called by other people",async()=>{
      const { Inheritance,lawyer,addr1} = await loadFixture(deployTokenFixture);
      await Inheritance.assignAsset(lawyer.address,{value:ethers.utils.parseEther("8")})
      await expect
      (Inheritance.connect(lawyer).setInheritance(addr1.address,ethers.utils.parseEther("3")))
      .to.be.revertedWith("Only AssetOwner is allowed")
      
         
    })
    
    it("Change the Lawyer of the contract",async()=>{
      const { Inheritance,lawyer,addr2} = await loadFixture(deployTokenFixture);
      await Inheritance.assignAsset(lawyer.address,{value:ethers.utils.parseEther("8")})
      await Inheritance.changeLawyer(addr2.address);
      expect(await Inheritance.lawyer()).to.equal(addr2.address);
         
    })


 
  });
  
});