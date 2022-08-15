import React,{useState} from 'react'
import {ethers} from "ethers";

import { contractAddress, ABI} from '../utils/constants';
export const InheritanceContext = React.createContext();

const { ethereum } = window;



export const InheritanceProvider = ({children}) => {
  const [form, setform] = useState({amount:"",address:""})
  const[currentAccount,setCurrentAccount]=useState("");
const [newLawyer, setnewLawyer] = useState("");
 const [form2, setform2] = useState({AMOUNT:"",ADDRESS:""})
 const [connected, setConnected] = useState(false)
  const createEthereumContract = async() => {
    if(!ethereum){
      alert("Install Metamask")
      return;
    }else{
      const accounts = await ethereum.request({ method: "eth_requestAccounts", });
    setCurrentAccount(accounts[0]);
    const provider = new ethers.providers.Web3Provider(ethereum);
    
    const signer = provider.getSigner();
    const InheritanceContract = new ethers.Contract(contractAddress, ABI, signer);
 
    return InheritanceContract;
    }
   
  }  
    
    
  const changeHandler2 = (e) => {
    setform2(prevState=>{
      return {...prevState,[e.target.name] :e.target.value};
    })
      
    };
  



  const changeHandler = (e) => {
  setform(prevState=>{
    return {...prevState,[e.target.name] :e.target.value};
  })
    
  };

  const changeLawyer = (e) => {
    setnewLawyer(e.target.value);
      
    };
  


  const connectWallet = async () => {
   if(!ethereum){
  alert("Install Metamak");
  }else{
    const accounts = await ethereum.request({ method: "eth_requestAccounts", });
    setCurrentAccount(accounts[0]); 
    setConnected(true)
  
  }


 
  };

  
  return (
    <InheritanceContext.Provider value={{newLawyer,changeLawyer,form2,setform2,connected,setConnected,changeHandler2,currentAccount,connectWallet,form,setform,changeHandler,createEthereumContract}}>
    {children}
    </InheritanceContext.Provider>
    
  )
}

