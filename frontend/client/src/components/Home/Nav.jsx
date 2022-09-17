import React, { useContext } from 'react'
import { InheritanceContext } from '../Context/InheritanceContext'
import { shortenAddress } from '../utils/constants'
const Nav = () => {
  const {currentAccount,connected}=useContext(InheritanceContext)
  return (
    <div className="w3-display-topright w3-container">
    {connected && <span className=' w3-card w3-deep-purple w3-border-white w3-text-white w3-round w3-padding w3-hide-small w3-right'  style={{border:"6px double white"}} >Account Address: {shortenAddress(currentAccount)}</span>}
    {connected && <span className='w3-card  w3-deep-purple w3-border-white w3-text-white w3-round w3-hide-medium w3-hide-large w3-right'  style={{border:"4px double white"}} >Account Address: {shortenAddress(currentAccount)}</span>}
    
    </div>
  )
}

export default Nav