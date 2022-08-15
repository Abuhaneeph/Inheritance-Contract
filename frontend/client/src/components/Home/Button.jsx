import React,{useContext,useState} from 'react'
import { InheritanceContext } from '../Context/InheritanceContext'
const Button = () => {

  const{connectWallet,connected}=useContext(InheritanceContext)
  return (
    <div>
       {!connected && <button className='btn w3-hide-large w3-hide-small' onClick={connectWallet}>Connect Wallet</button>}
      {!connected && <button className='btn w3-hide-medium w3-hide-small' onClick={connectWallet}>Connect Wallet</button>}
       {!connected && <button className='btn w3-tiny w3-hide-large w3-hide-medium' onClick={connectWallet}>Connect Wallet</button>}
    </div>
  )
}

export default Button