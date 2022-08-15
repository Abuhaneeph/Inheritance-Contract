import React from 'react'
import stat3 from '../../assets/stat3.png'
import stat4 from '../../assets/stat4.png'
const About = () => {
  return (
    <div>
     <div className='w3-container w3-padding '>
      <center><h1>ABOUT</h1></center>
    <div className="w3-cell-row" style={{backgroundImage:"linear-gradient(to right, indigo ,blueviolet,indigo)"}}>

    <div className="w3-container w3-panel w3-cell w3-mobile" >
    <div>
    <center> <img src={stat3}></img></center>
    </div>
    <center className="w3-text-white w3-animate-top w3-padding">
    Deposit your crypto-asset and set the Lawyer for the contract , share it among your Inheritors
      </center> 
    
  </div>

  <div className="w3-container w3-panel w3-cell  w3-mobile" >
  <div>
  <center><img src={stat4}></img></center>

  </div>
<center className="w3-text-white">
Inheritors only received Funds when the Lawyer notify the contract the Owner is dead.
</center>
 
  </div>

 

</div>
</div>

        
    </div>
  )
}

export default About