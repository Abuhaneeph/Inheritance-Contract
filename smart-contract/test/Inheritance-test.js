
const { expect } = require("chai");


const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");


describe("Inheritance", function () {
  
  async function deployTokenFixture() {
    // Get the ContractFactory and Signers here.
    const InheritanceFactory = await ethers.getContractFactory("Inheritance");
    const [assetOwner,assetOwner2, lawyer,lawyer2, addr1, addr2, addr3, addr4] = await ethers.getSigners();

   
    const Inheritance = await InheritanceFactory.deploy();

    await Inheritance.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { InheritanceFactory, Inheritance, assetOwner, assetOwner2, lawyer, lawyer2,addr1, addr2 , addr3,addr4};
  }

  // You can nest describe calls to create subsections.
  describe("Inheritance Contract", function () {
    
    it("Should count Family Wallet after payout", async function () {
      
      const { Inheritance,assetOwner, assetOwner2, lawyer,lawyer2,addr1,addr2,addr3,addr4} = await loadFixture(deployTokenFixture);
      await Inheritance.connect(assetOwner).assignAsset(lawyer.address,{value:ethers.utils.parseEther("6")})
      await Inheritance.connect(assetOwner).shareAsset(addr1.address,ethers.utils.parseEther("3"),1)
      await Inheritance.connect(assetOwner).shareAsset(addr2.address,ethers.utils.parseEther("3"),1)
     
     
      await Inheritance.connect(assetOwner2).assignAsset(lawyer2.address,{value:ethers.utils.parseEther("6")})
      await Inheritance.connect(assetOwner2).shareAsset(addr3.address,ethers.utils.parseEther("3"),2)
      await Inheritance.connect(assetOwner2).shareAsset(addr4.address,ethers.utils.parseEther("3"),2) 
      await Inheritance.connect(lawyer2).payout(2)
      await Inheritance.connect(lawyer).payout(1)
      expect(await Inheritance.countFamily(1)).to.equal(0);
     expect(await Inheritance.countFamily(2)).to.equal(0);
    });  


    it("Change Lawyer of the Contract", async function () {
      
      const { Inheritance,assetOwner, lawyer,lawyer2,addr1,addr2} = await loadFixture(deployTokenFixture);
      await Inheritance.connect(assetOwner).assignAsset(lawyer.address,{value:ethers.utils.parseEther("6")})
      await Inheritance.connect(assetOwner).shareAsset(addr1.address,ethers.utils.parseEther("3"),1)
      await Inheritance.connect(assetOwner).shareAsset(addr2.address,ethers.utils.parseEther("3"),1)
     
     
      await Inheritance.connect(assetOwner).changeLawyer(lawyer2.address,1)
      await Inheritance.connect(lawyer2).payout(1) 
      expect(await Inheritance.getLawyer(1)).to.equal(lawyer2.address)
    });  
 
    it("Revert Error if assignAsset is called by not the owner", async function () {
      
      const { Inheritance,assetOwner, lawyer,addr1} = await loadFixture(deployTokenFixture);
      await Inheritance.connect(assetOwner).assignAsset(lawyer.address,{value:ethers.utils.parseEther("6")})
      await expect(Inheritance.connect(addr1).shareAsset(addr1.address,ethers.utils.parseEther("6"),1)).to.be.revertedWithCustomError(Inheritance,"onlyOwner");
      
      
    }); 
   
    it("Revert Error if asset shared is greater than the contract asset", async function () {
      
      const { Inheritance,assetOwner, lawyer,addr1} = await loadFixture(deployTokenFixture);
      await Inheritance.connect(assetOwner).assignAsset(lawyer.address,{value:ethers.utils.parseEther("6")})
      await expect(Inheritance.shareAsset(addr1.address,ethers.utils.parseEther("7"),1)).to.be.revertedWithCustomError(Inheritance,"InsufficientFund");

      
    }); 
   
   
   
   
    
  });
  
});