import React,{useState} from 'react'
import {ethers} from 'ethers'
import { useContext } from 'react'
import { InheritanceContext } from '../Context/InheritanceContext'

const Service = () => {
  const {newLawyer,changeLawyer,form,changeHandler,createEthereumContract,form2,changeHandler2} =useContext(InheritanceContext)
  const [isLoadingAssign, setIsLoadingAssign] = useState(false);
  const [isLoadingShare, setIsLoadingShare] = useState(false);
  const [isLoadingChange, setIsLoadingChange] = useState(false);
  const{amount,address}=form;
  const{AMOUNT,ADDRESS}=form2;
  const handleAssign = async(e) => {
    e.preventDefault();
      const AmountInWei=ethers.utils.parseEther(amount);
      if (!address || !amount) return;
      
     const InheritanceContract=await createEthereumContract();
    const Inheritance= await InheritanceContract.assignAsset(address,{value:AmountInWei});
    setIsLoadingAssign(true) 
     console.log(`Loading - ${Inheritance.hash}`);
          await Inheritance.wait();
          console.log(`Success - ${Inheritance.hash}`);
          setIsLoadingAssign(false);
    
    };
  
  const handleShare=async(e)=>{
    e.preventDefault();
    try{
    if (!ADDRESS || !AMOUNT) return;
    const InheritanceContract=await createEthereumContract();
   const Contract= await InheritanceContract.setInheritance(ADDRESS,ethers.utils.parseEther(AMOUNT));
setIsLoadingShare(true) 
     console.log(`Loading - ${Contract.hash}`);
          await Contract.wait();
          console.log(`Success - ${Contract.hash}`);
        setIsLoadingShare(false);
    }catch(error){
      console.log(error)
    }
  };

  const Change=async(e)=>{
   e.preventDefault();
   try{
    if(!newLawyer) return;
    const InheritanceContract=await createEthereumContract();
    const changeLawyer= await InheritanceContract.changeLawyer(newLawyer);
    setIsLoadingChange(true);
    console.log(`Loading - ${changeLawyer.hash}`);
           await changeLawyer.wait();
           console.log(`Success - ${changeLawyer.hash}`);
           setIsLoadingChange(false);
   }catch(error){
    console.log(error)
   }
  
  }
  
  return (
    <>
    <center><h1> OWNER'S SECTION</h1></center>
<div className='w3-container'>
    <div className="w3-cell-row " >

    <div className="w3-container w3-panel w3-cell  w3-deep-purple w3-mobile" >
  <form className='w3-margin'>
    <center><label>Asset Amount:</label><br></br></center>
    <input name="amount" className='w3-input w3-animate-input w3-round w3-border-0' type="number" placeholder="Amount in ETH" value={form.amount} onChange={changeHandler}></input>
  <center><label>Address:</label><br></br></center>
  <input name="address" className='w3-input w3-animate-input w3-round w3-border-0' type="text" placeholder="Lawyer Address" value={form.address} onChange={changeHandler}></input>
 <center><button className='btn w3-tiny W3-deep-purple w3-margin-top' onClick={handleAssign}>SEND CRYPTO-ASSET</button></center> 
  </form>
  {isLoadingAssign && <center><div className='loader'></div></center>}
  </div>

  <div className="w3-container w3-panel w3-cell  w3-deep-purple w3-mobile" >
  <form className='w3-margin'>
    <center><label>Inheritor Amount:</label><br></br></center>
    <input name="AMOUNT" className='w3-input w3-animate-input w3-round w3-border-0' type="number" placeholder="Amount in ETH" value={form.AMOUNT} onChange={changeHandler2}></input>
  <center><label>Inheritor's Address:</label><br></br></center>
  <input name="ADDRESS" className='w3-input w3-animate-input w3-round w3-border-0' type="text" placeholder="Address" value={form.ADDRESS} onChange={changeHandler2}></input>
 <center><button className='btn w3-tiny W3-deep-purple w3-margin-top' onClick={handleShare}>SHARE CRYPTO-ASSET</button></center> 
  </form>
  {isLoadingShare && <center><div className='loader2'></div></center>}
  </div>

</div>


</div>

<div className=" w3-container w3-cell-row">

<div className="w3-container w3-cell w3-mobile w3-panel w3-deep-purple">
  <center><p>If the Lawyer assigned should die before the Owner.Use the Form below to change the Lawyer</p></center>
  <form  className='w3-margin'>
 <center><label>New Lawyer Address:</label><br></br></center> 
    <input name="NEW_LAWYER" className='w3-input w3-animate-input w3-round w3-border-0' type="text" placeholder="New Address" value={newLawyer} onChange={changeLawyer} ></input>
  <center><button className='btn w3-tiny w3-margin' onClick={Change}>CHANGE</button></center>
  </form>
  {isLoadingChange && <center><div className='loader2'></div></center>}
</div>
</div>
  </>
  )
  };
export default Service