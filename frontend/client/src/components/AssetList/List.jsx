import React,{useEffect,useContext,useState} from 'react'
import { ethers } from 'ethers'
import { shortenAddress } from '../utils/constants'
import { InheritanceContext } from '../Context/InheritanceContext'
const List = () => {
const[list,setList]=useState([]);
useEffect(() => {
getAllAssets()
 
}, [])


const {createEthereumContract} = useContext(InheritanceContext)
const getAllAssets=async()=>{
 const InheritanceContract=await createEthereumContract();
 const AssetOwner= await InheritanceContract.assetOwner();
//console.log(AssetOwner)
 const InheritanceLists= await InheritanceContract.FamilyLists();

console.log(InheritanceLists)
 const structuredList=InheritanceLists.map((eachMember)=>({
    address: shortenAddress(eachMember.familymember),
    amount:  ethers.utils.formatEther(eachMember.amount),
    owner:   shortenAddress(AssetOwner)
    
 }))
 console.log(structuredList)
  setList(structuredList);
 




//console.log(AssetOwner)
}
  return (
    <>
    <center><h1>SHARED ASSET</h1></center>  
      <div className='w3-container'>
    <div className="w3-row">
      {list.map((eachInheritor,index)=> {
      return (
       

    <div key={index} className="w3-container w3-margin w3-round w3-panel w3-third  w3-deep-purple"  >  
        
        <center>
        <p>Address from: {eachInheritor.owner}</p>
        <p>Address to:  {eachInheritor.address}  </p>
        <p>Amount: {eachInheritor.amount}ETH </p>
        </center>
      </div>
      
      )})}
    </div>
    </div>
    </>
  )
}

export default List