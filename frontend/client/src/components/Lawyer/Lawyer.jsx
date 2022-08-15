import React,{useContext,useState} from 'react'
import { InheritanceContext } from '../Context/InheritanceContext'
import { ethers } from 'ethers';
const Lawyer = () => {
  const{ethereum} =window;
 const{createEthereumContract,currentAccount}=useContext(InheritanceContext);
 const [isLoading, setisLoading] = useState(false);
  const handleClick=async()=>{
    try{
  const InheritanceContract=await createEthereumContract();

 const shareAsset = await InheritanceContract.hasDeceased({gasLimit:2500000});
  
  

 setisLoading(true);
  console.log(`Loading - ${shareAsset.hash}`);
       await shareAsset.wait();
       console.log(`Success - ${shareAsset.hash}`);
  setisLoading(false);
    }catch(error){
      console.log(error)
    }
  }
  
  
  return (
    <>
     <center><h1>LAWYER'S SECTION</h1></center>
    <div className='w3-container w3-margin' style={{backgroundImage:"linear-gradient(to right, blueviolet ,blueviolet,indigo)"}}>
    <center>
    
      
      <center><p className='w3-text-white'>If the Owner of the Crypto-Asset is dead.The Lawyer should connect to the address used by the Owner's of the Crypto-Asset and should click the button to share the Owner's Crypto-Asset to his/her Inheritor</p></center>
       <center> <button className='btn w3-small w3-padding w3-margin' onClick={handleClick}>SHARE ASSET</button></center>
       {isLoading && <center><div className='loader2'></div></center>}


  
    </center>
    </div>
    
    
    
    </>
   
  )
}

export default Lawyer