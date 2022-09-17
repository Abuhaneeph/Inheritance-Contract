import { useEffect } from "react";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import { InheritanceProvider } from "./components/Context/InheritanceContext";
import Service from "./components/Service/Service";
import List from "./components/AssetList/List";
import Lawyer from "./components/Lawyer/Lawyer";

const App = () => {
  useEffect(() => {
    new WOW().init();
  }, [])
  
  return (
    <>
    <InheritanceProvider>
    <Home/>
     <About/>
     <Service/>
     <Lawyer/>
     <List/>
    </InheritanceProvider>
     
      </>
  )

};


export default App
