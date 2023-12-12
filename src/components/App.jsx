import Forgot from './Forgot';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Reset from './Reset';
import {BrowserRouter, Routes, Route} from "react-router-dom";



function App() {

  return (
    <div style={{marginTop : '-3.5rem'}}>
      <BrowserRouter >
        <Routes>
          <Route path="/" element ={<Register/>} />
          <Route path="/register" element ={<Register/>} />
          <Route path="/login" element ={<Login/>} />
          <Route path="/home" element ={<Home/>} />
          <Route path="/Forgot" element ={<Forgot/>} />
          <Route path="/Reset" element ={<Reset/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
