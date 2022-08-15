import React from 'react'
import hero from '../../assets/hero.jpg'
import Large from './Large/Large'
import Medium from './Medium/Medium'
import Nav from './Nav'
import Small from './Small/Small'


const Home = () => {
  
  return (
    <>
<div className='w3-container'>

<div className="w3-display-container w3-text-white">
  <img src={hero} alt="Lights" style={{width:"100%"}} className="w3-grayscale-min"></img>
  <div className="w3-display-topleft w3-container w3-text-white font-effect-neon w3-wide" style={{top:"5px"}}>INSUDOR</div>
  <Nav/>
 
 <Large/>
 <Small/>
 <Medium/>
 
 
</div>

</div>

  </>
  )
}

export default Home