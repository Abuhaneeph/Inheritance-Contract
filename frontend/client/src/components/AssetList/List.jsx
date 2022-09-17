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
  if(!window.ethereum){
    alert("Install Metamask Wallet")
    return;  
  }
 const InheritanceContract=await createEthereumContract();
 
 const InheritanceLists= await InheritanceContract.getAllInheritors();

console.log(InheritanceLists)
 const structuredList=InheritanceLists.map((eachMember)=>({
    address: shortenAddress(eachMember.inheritor),
    amount:  ethers.utils.formatEther(eachMember.amount),
    owner:   shortenAddress(eachMember.owner),
    id:      eachMember.id.toNumber()
 }))
 
  setList(structuredList);
 





}
  return (
    <>
    <center><h1 className='font-effect-fire animate__animated animate__flip animate__slower animate__infinite' style={{fontFamily: "Audiowide, sans-serif",fontSize:'25px'}}>SHARED ASSET</h1></center>  
  
      <div className='w3-container w3-responsive'>

    <table className='w3-table w3-medium wow heartBeat' data-relay="0.2" style={{backgroundImage:"linear-gradient(360deg,#ba55d3,#9400d3)"}}>
      {list.map((eachInheritor,index)=> {
      return (
       

<center>
    <tr key={index} className="w3-round w3-padding ">  
        
        
        <td className='w3-center'><th className='w3-center w3-text-white'>Inherited from: </th>{eachInheritor.owner}</td>
        <td className='w3-center'><th className='w3-center w3-text-white'>Inheritor's: </th> {eachInheritor.address}  </td>
        <td className='w3-center'><th className='w3-center w3-text-white'>Amount Inherited:</th> {eachInheritor.amount}ETH </td>
        <td className='w3-center'><th className='w3-center w3-text-white'>Inheritance ID:</th> {eachInheritor.id}</td>
        
      </tr>
      </center>   

     
  
      )})}
    </table>
    </div>
   
    </>
  )
}

export default List