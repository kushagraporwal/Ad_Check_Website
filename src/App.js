import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Adminlogin from './components/Adminlogin';
import Admin from './components/Admin';
import Userlogin from './components/Userlogin';
import User from './components/User';
import Home from './components/Home';
import Register from './components/Register';
import Logout from './components/Logout';

function App() {
  return (
    <>
    <Routes>
    <Route exact path="/" element={<Home/>}/>
    <Route exact path="/register" element={<Register/>}/>
    <Route exact path="/user/:userid" element={<User/>}/>
    <Route exact path="/admin" element={<Admin/>}/>
    <Route exact path="/userlogin" element={<Userlogin/>}/>
    <Route exact path="/adminlogin" element={<Adminlogin/>}/>
    <Route exact path="/logout" element={<Logout/>}/>
    </Routes>
    </>
  );
}

export default App;
