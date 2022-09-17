import React,{useContext,useState} from 'react'
import { InheritanceContext } from '../Context/InheritanceContext'


const Lawyer = () => {
  const{ethereum} =window;
  const[id,setId]=useState("");
 const{createEthereumContract,currentAccount}=useContext(InheritanceContext);
 const [isLoading, setisLoading] = useState(false);
  
 const onChangeId=(e)=>{
  setId(e.target.value)
    
 }
 
 const handleClick=async(e)=>{
  e.preventDefault();
    try{
   if(!id){
    return;
   }
  const InheritanceContract=await createEthereumContract();

 const shareAsset = await InheritanceContract.payout(id);
  
  

 setisLoading(true);
  console.log(`Loading - ${shareAsset.hash}`);
       await shareAsset.wait();
       console.log(`Success - ${shareAsset.hash}`);
  setisLoading(false);
    }catch(error){
      setisLoading(false);
      console.log(error)
    }
  }
  
  
  return (
    <>
     <center>
      <h1 className='animate__animated animate__flip animate__slower animate__infinite font-effect-fire' style={{fontFamily: "Audiowide, sans-serif",fontSize:"25px"}}>LAWYER'S SECTION</h1></center>
    <div className='w3-container w3-margin 'style={{backgroundImage:"linear-gradient(360deg,#ba55d3,#9400d3)"}} >
    <center>
    
      
      <center><p className='w3-text-white w3-bold w3-medium wow rubberBand' style={{fontStyle:"normal"}}
      data-relay="0.2s" >If the Owner of the Crypto-Asset is dead.The Lawyer should connect to the address used by the Owner's of the Crypto-Asset, input the Owner's Inheritance ID should click the button to share the Owner's Crypto-Asset to his/her Inheritor</p></center>
      <form>
       <center> 
       <center><label className='w3-text-white'>ID:</label><br></br></center> 
          <input type="number" value={id} onChange={onChangeId} className="w3-input w3-animate-input w3-round w3-border-0"  style={{width:"70px"}}></input><br></br>

        <button className="cta"  onClick={handleClick}>
       
       
  <span className='font-effect-fire'>Share Asset</span>
  <svg viewBox="0 0 13 10" height="10px" width="15px">
    <path d="M1,5 L11,5"></path>
    <polyline points="8 1 12 5 8 9"></polyline>
  </svg>
</button>
        
    </center>
    </form>
       {isLoading && <center><div className='loader2'></div></center>}


  
    </center>
    </div>
    
    
    
    </>
   
  )
}

export default Lawyer