
import About from "./components/About/About";
import Home from "./components/Home/Home";
import Lawyer from "./components/Lawyer/Lawyer";
import { InheritanceProvider } from "./components/Context/InheritanceContext";
import Service from "./components/Service/Service";
import List from "./components/AssetList/List";



const App = () => {
  
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
