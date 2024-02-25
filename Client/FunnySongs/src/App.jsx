
import './App.css'
import { BrowserRouter } from "react-router-dom";
import AllRoutes from './Components/Routes/AllRoutes';
import MainComponent from './Components/MainComponent/MainComponent';



function App() {


  return (
    <BrowserRouter>
      <AllRoutes/>  
      {/* <MainComponent/> */}
    </BrowserRouter>
  )
}

export default App
