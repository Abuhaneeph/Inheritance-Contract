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
  const{AMOUNT,ADDRESS,ID}=form2;
  const{newLawyerAddress,id}=newLawyer;
  const handleAssign = async(e) => {
    try{
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
          const ID=await InheritanceContract.ID();
          alert("Your Inheritance ID is "+ID);
    }catch(error){
      setIsLoadingAssign(false);
      console.log(error)
    }
    };
  
  const handleShare=async(e)=>{
    e.preventDefault();
    try{
    if (!ADDRESS || !AMOUNT || !ID) return;
   
    const InheritanceContract=await createEthereumContract();
   const Contract= await InheritanceContract.shareAsset(ADDRESS,ethers.utils.parseEther(AMOUNT),ID);
setIsLoadingShare(true) 
     console.log(`Loading - ${Contract.hash}`);
          await Contract.wait();
          console.log(`Success - ${Contract.hash}`);
        setIsLoadingShare(false);
        
    }catch(error){
      setIsLoadingShare(false);
      console.log(error)
    }
  };

  const Change=async(e)=>{
   e.preventDefault();
   try{
    if(!newLawyerAddress || !id ) return;
    console.log(newLawyerAddress,id);
    const InheritanceContract=await createEthereumContract();
    const changeLawyer= await InheritanceContract.changeLawyer(newLawyerAddress,id);
    setIsLoadingChange(true);
    console.log(`Loading - ${changeLawyer.hash}`);
           await changeLawyer.wait();
           console.log(`Success - ${changeLawyer.hash}`);
           setIsLoadingChange(false);
   }catch(error){
    setIsLoadingChange(false);
    console.log(error)
   }
  
  }
  
  return (
    <>
    <center><h1 className='animate__animated animate__flip animate__slower animate__infinite font-effect-fire' style={{fontFamily: "Audiowide, sans-serif",fontSize:"25px"}}> OWNER'S SECTION</h1></center>
<div className='w3-container'>
    <div className="w3-cell-row " style={{backgroundImage:"linear-gradient(360deg,#ba55d3,#9400d3,indigo)"}}>

    <div className="w3-container w3-panel w3-cell  w3-mobile"  >
  <form className='w3-margin'>
    <center><label className='w3-text-white user-label font-effect-shadow-multiple'>Asset Amount:</label><br></br></center>
    <input name="amount" className='w3-input w3-animate-input w3-round w3-border-0' type="number" placeholder="Amount in ETH" value={form.amount} onChange={changeHandler}></input>
  <center><label className='w3-text-white font-effect-shadow-multiple'>Address:</label><br></br></center>
  <input name="address" className='w3-input w3-animate-input w3-round w3-border-0' type="text" placeholder="Lawyer Address" value={form.address} onChange={changeHandler}></input>
 <center><button className='btn w3-tiny W3-deep-purple w3-margin-top font-effect-fire' onClick={handleAssign}>SEND CRYPTO-ASSET</button></center> 
  </form>
  {isLoadingAssign && <center><div className='loader'></div></center>}
  </div>

  <div className="w3-container w3-panel w3-cell  w3-mobile" >
  <form className='w3-margin'>
    <center><label className='w3-text-white font-effect-shadow-multiple'>Inheritor's Amount:</label><br></br></center>
    <input name="AMOUNT" className='w3-input w3-animate-input w3-round w3-border-0' type="number" placeholder="Amount in ETH" value={form.AMOUNT} onChange={changeHandler2}></input>
  <center><label className='w3-text-white font-effect-shadow-multiple'>Inheritor's Address:</label><br></br></center>
  <input name="ADDRESS" className='w3-input w3-animate-input w3-round w3-border-0' type="text" placeholder="Address" value={form.ADDRESS} onChange={changeHandler2}></input>
  <center><label className='w3-text-white font-effect-shadow-multiple'>ID:</label><br></br></center>
  <input name="ID" className='w3-input w3-animate-input w3-round w3-border-0' type="number" placeholder="ID" value={form.ID} onChange={changeHandler2}></input>
 
 <center><button className=' btn w3-tiny W3-deep-purple w3-margin-top' onClick={handleShare}>SHARE CRYPTO-ASSET</button></center> 
  </form>
  {isLoadingShare && <center><div className='loader2'></div></center>}
  </div>

</div>


</div>
<div className='w3-panel'>
<div className="w3-cell-row">

<div className="w3-container w3-cell w3-mobile w3-panel " style={{backgroundImage:"linear-gradient(360deg,#ba55d3,#9400d3)"}}>
  <center><p style={{fontFamily:'Gravitas One, cursive'}} className="wow pulse w3-text-white" data-relay='0.2s'>If the Lawyer assigned should die before the Owner.Use the Form below to change the Lawyer</p></center>
  <form  className='w3-margin'>
 <center><label className='w3-text-white'>New Lawyer Address:</label><br></br></center> 
    <center>
    <input name="newLawyerAddress" className='w3-input w3-animate-input w3-round w3-border-0' type="text" placeholder="New Address" value={newLawyer.newLawyerAddress} onChange={changeLawyer} style={{width:"280px"}}></input>
    <center><label className='w3-text-white'>ID:</label><br></br></center> 
    <input name="id" className='w3-input w3-animate-input w3-round w3-border-0' type="number" placeholder="ID" value={newLawyer.id} onChange={changeLawyer} style={{width:"200px"}}></input>
  </center>
  <center><button className='btn w3-small w3-padding w3-margin' onClick={Change}>CHANGE</button></center>
  </form>
  {isLoadingChange && <center><div className='loader2'></div></center>}
</div>
</div>
</div>

  </>
  )
  };
export default Service