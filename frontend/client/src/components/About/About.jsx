import React from 'react'
import stat3 from '../../assets/stat3.png'
import stat4 from '../../assets/stat4.png'
const About = () => {
  return (
    <div>
     <div className='w3-container w3-padding '>
      <center><h1 className='font-effect-fire animate__animated animate__flip animate__slower animate__infinite' style={{fontFamily: "Audiowide, sans-serif",fontSize:'25px'}}>ABOUT</h1></center>
    <div className="w3-cell-row" style={{backgroundImage:"linear-gradient(270deg, black , RebeccaPurple,blueviolet,indigo,black)"}}>

    <div className="w3-container w3-panel w3-cell w3-mobile" >
    <div>
    <center> <img src={stat3}></img></center>
    </div>
    <div className="wow zoomIn w3-text-white w3-bold w3-animate-top w3-padding " data-wow-delay="0.1s">
     <center>
      <ul style={{listStyleType:"none"}}>
        <li className='' style={{paddingBottom:"7px"}}>Deposit your Crypto-asset </li>
        <li className='' style={{paddingBottom:"7px"}}>Submit your Lawyer Address</li>
        <li className='' style={{paddingBottom:"7px"}}>Share your Deposited Asset among your Inheritors with your Inheritane ID </li>
        
      </ul>
      </center>
      </div> 
    
  </div>

  <div className="w3-container w3-panel w3-cell  w3-mobile " >
  <div>
  <center><img src={stat4}></img></center>

  </div>
<div className=" wow zoomIn w3-text-white w3-padding" data-wow-delay="0.1s">
<center>
<ul style={{listStyleType:"none"}}>
<li className='' style={{paddingBottom:"7px"}}>If the Owner of the asset is dead</li>
<li className='' style={{paddingBottom:"7px"}}>Share-Asset button is called by the Lawyer with the Inheritance ID</li>
<li className='' style={{paddingBottom:"7px"}}>Asset is distributed to Inheritors instantly</li>
</ul>
</center>


</div>
 
  </div>

 

</div>
</div>

        
    </div>
  )
}

export default About