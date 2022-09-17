// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;

import "hardhat/console.sol";

contract Inheritance{
    struct Property{
        address owner;
        address lawyer;
        address payable [] inheritors;
        uint256[] eachMemberAmount;
        uint256 asset;
        uint256 id;
    }
mapping (uint256 => Property) eachInheritance;
uint256 public ID;

   struct familyMember{
       address owner;
       address inheritor;
       uint256 amount;
       uint256 id;
   }
familyMember[] private allInheritorsList;


//error
error onlyLawyer();
error onlyOwner();
error InsufficientFund();
error invalidID();

function assignAsset(address _lawyer) payable external  {
    ID++;
   Property storage p=eachInheritance[ID];
    p.owner=msg.sender;
    p.lawyer=_lawyer;
    p.asset=msg.value;
    p.id=ID;
    console.log("ID is %s",p.id); 
     console.log("The owner is %s,The Lawyer is %s,The Asset is %s",p.owner,p.lawyer,p.asset);  
}

function shareAsset(address payable _inheritor, uint256 _amount,uint256 _id) payable external{
    Property storage p=eachInheritance[_id];
    if(_id != p.id){
        revert invalidID();
    }
    
    if(msg.sender != p.owner){
        revert onlyOwner();
    }
    if(p.asset < _amount){
        revert InsufficientFund();
    }
   p.asset-=_amount;
   uint256 amount=_amount;
   p.eachMemberAmount.push(amount);
   p.inheritors.push(_inheritor);   
 console.log("ID is %s",p.id); 
console.log("The owner is %s,The Lawyer is %s,The Asset is %s",p.owner,p.lawyer,p.asset);  
}

function changeLawyer(address _lawyer,uint256 _id) external{ 
      Property storage p=eachInheritance[_id];
    if(_id != p.id){
        revert invalidID();
    }
    
    if(msg.sender != p.owner){
        revert onlyOwner();
    }
   p.lawyer=_lawyer;


}


function payout(uint256 _id) payable external{
 Property storage p=eachInheritance[_id];
     if(_id != p.id){
        revert invalidID();
   }
    if(msg.sender != p.lawyer){
        revert onlyLawyer();
    }   
  
for(uint256 i=0;i<p.inheritors.length;i++){
    p.inheritors[i].transfer(p.eachMemberAmount[i]);
    allInheritorsList.push(familyMember(p.owner,p.inheritors[i],p.eachMemberAmount[i],p.id));
console.log("The address is %s inherited %s from %s",p.inheritors[i],p.eachMemberAmount[i],p.owner);

}
p.inheritors=new address payable[](0);
p.eachMemberAmount=new uint256[](0);
}
function getOwner(uint256 _id) external view returns (address){ 
Property storage p=eachInheritance[_id];
    return p.owner; 
}

function getLawyer(uint256 _id) external view returns(address){
Property storage p=eachInheritance[_id];
console.log("The new Lawyer is %s",p.lawyer);
    return p.lawyer; 
}

function getFamilyList(uint256 _id) external view returns(address payable [] memory){
  Property storage p=eachInheritance[_id];
  return p.inheritors;
}

 function getAllInheritors() external view returns(familyMember[] memory){
     return allInheritorsList;
 }


function countFamily(uint256 _id) external view returns (uint256){
    Property storage p=eachInheritance[_id];
    console.log("The Inheritors array length is %s",p.inheritors.length);
  return p.inheritors.length;
}


}