// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7;

import "hardhat/console.sol";

/**
Inheritance Smart-contract is a contract where the owner of an digital asset
can share his/her asset to his/her inheritors and assigned a Lawyer to the
that will tell the contract the Owner is dead so that the asset will be distributed to 
his/her Inheritors

 **/

contract Inheritance{
  address public  lawyer;
  address public  assetOwner;
  uint256 public fortune; 
  bool public isDeceased;
  address payable [] public familyWallet;
  mapping(address => uint) inheritance;
  struct Family{
    address familymember;
    uint amount;
  }
  Family[] inheritors;
   event Transfer (address from,address to, uint amount);
  
 
  modifier onlyLawyer{
      require(msg.sender == lawyer,"Only the Lawyer is allowed");
      _;
  }
    modifier mustbeDeceased{
        require(isDeceased == true);
        _;
    }
 
 modifier onlyOwner{
    require(msg.sender == assetOwner,"Only AssetOwner is allowed");
    _;
 }


 function assignAsset(address _lawyer) payable public{
      assetOwner=msg.sender;
      lawyer = _lawyer;
      fortune=msg.value;
      isDeceased = false;
      console.log("Fortune is %s,The Owner is %s",fortune,assetOwner);

 }

    function setInheritance(address wallet, uint amount)onlyOwner  payable public {
       
        require(amount <= fortune,"Insufficient Funds");
        inheritance[wallet]= amount;
        fortune-=amount;
        familyWallet.push(payable(wallet));
        console.log("Fortune is %s,The Owner is %s",fortune,assetOwner);

    }

   function changeLawyer(address _lawyer) onlyOwner public{
         lawyer = _lawyer;
   }



   function payout() mustbeDeceased private {
       require(fortune == 0,"Left over fund not assigned to the Family Wallet");
       for(uint256 i=0; i <familyWallet.length; i++){
           //Transfer eth to family members
           familyWallet[i].transfer(inheritance[familyWallet[i]]);
           //push family members address with the amount transferred to them
           inheritors.push(Family(familyWallet[i],inheritance[familyWallet[i]]));           
           
           emit Transfer (assetOwner, familyWallet[i],inheritance[familyWallet[i]]);
            
           
       }
  
   }
  
   function hasDeceased() onlyLawyer public{
       isDeceased = true;
       payout();  
   }
   
  
  

  function FamilyLists() public view returns(Family[] memory){
      return inheritors;
  }

 
  
}