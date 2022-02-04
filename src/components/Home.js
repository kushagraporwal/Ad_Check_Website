import React from 'react';
import {NavLink} from 'react-router-dom';

const Home = () => {
  return <div>
  <div className='container' style={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',marginTop: '200px', paddingTop: '20px', borderRadius: '10px', backgroundColor:'#D9DBDB'}}>
  <div className='row'>
  <div className='col-md-6' style={{textAlign: 'center'}}>
      <h1 style={{fontSize: '60px'}}>Welcome to Ads Filter</h1>
      </div>
      <div className='col-md-6' style={{textAlign: 'center'}}>
      <button type="button" class="btn btn-primary" style={{marginBottom: '50px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}><NavLink className="nav-link" to="adminlogin" style={{color: 'white', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto'}}>Admin Login</NavLink></button>
      <button type="button" class="btn btn-success" style={{marginBottom: '50px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}><NavLink className="nav-link" to="userlogin" style={{textAlign: 'center', marginLeft: 'auto', marginRight: 'auto',color: 'white'}}>User Login</NavLink></button>
      <button type="button" class="btn btn-danger" style={{marginBottom: '50px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}><NavLink className="nav-link" to="register" style={{textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', color: 'white'}}>User Register</NavLink></button>
      </div>
      </div>
      </div>
  </div>;
};

export default Home;
