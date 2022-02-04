import React, { useEffect, useState, useContext } from 'react';
import {useNavigate, useParams, NavLink} from 'react-router-dom'

const Admin = () => {

  const history= useNavigate();
  const [userdata, setdata]= useState({});

  const callinfo = async()=>{
    try{
        console.log('welcome');
        const res= await fetch(`https://ad-check.herokuapp.com/admin`,{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            credentials: "include"
        });
        const data= await res.json();
        if(data=="-2")
        {
            window.alert('You must be logged in first');
            history('/adminlogin');
        }
        else
        {
          console.log(data);
        setdata(data);
        }
    }
    catch(err){
        console.log(err);
    }
}

const accept = async(name)=>{
        
  try{
      console.log("Hello");
      const res= await fetch(`https://ad-check.herokuapp.com/accept/${name._id}`,{
          method: "PUT",
          headers: {
              Accept: "application/json",
              "Content-Type":"application/json"
          },
          credentials: "include"
      });
      const data= await res.json();
      console.log(data);
      window.location.reload();
      
  }
  catch(err){
      console.log(err);
  }
}
const decline = async(name)=>{
  
  try{
      console.log("Hello");
      const res= await fetch(`https://ad-check.herokuapp.com/decline/${name._id}`,{
          method: "PUT",
          headers: {
              Accept: "application/json",
              "Content-Type":"application/json"
          },
          credentials: "include"
      });
      const data= await res.json();
      console.log(data);
      window.location.reload();
      
  }
  catch(err){
      console.log(err);
  }
}

const userads= userdata.ads;
var ads=new Array();
for(const ad in userads)
    {
        ads.push(userads[ad]);
    }

var ads2=new Array();
for(let i=ads.length-1;i>=0;i--)
    {
        ads2.push(ads[i]);
    }
    for(let i=0; i<=ads.length-1;i++)
    {
        ads2[i].index=i;
    }
console.log("userdata is");
{ads2.map(name => (
    console.log(name)
))}
  useEffect(() => {
    callinfo();
  },[]);
  
  return (<div>
  <div className='container-fluid'>
  <div className='row' style={{marginBottom: '50px'}}>
  <div className='col-6'>
      <h1 style={{marginTop: '50px', fontWeight: 'bold', textAlign: 'center'}}>Welcome Admin</h1>
      </div>
      <div className='col-6'>
      <button type="button" class="btn btn-primary" style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '50px'}}><NavLink className="nav-link" to="/logout" style={{color: 'white', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto'}}>Logout</NavLink></button>
      </div></div>
      <table style={{marginLeft: 'auto', marginRight: 'auto',boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', width: '80%', marginBottom: '100px'}}>
      <tr style={{backgroundColor: '#3D3A3A', color: 'whitesmoke'}}>
    <th style={{width: '100px', textAlign: 'center', paddingTop: '15px', paddingBottom: '15px'}}>Username</th>
    <th style={{width: '100px', textAlign: 'center', paddingTop: '15px', paddingBottom: '15px'}}>Title</th>
    <th style={{width: '200px', textAlign: 'center', paddingTop: '15px', paddingBottom: '15px'}}>Description</th>
    <th style={{width: '80px', textAlign: 'center', paddingTop: '15px', paddingBottom: '15px'}}>Budget</th>
    <th style={{width: '150px', textAlign: 'center', paddingTop: '15px', paddingBottom: '15px'}}>Link</th>
    <th style={{width: '100px', textAlign: 'center', paddingTop: '15px', paddingBottom: '15px'}}>Approve</th>
  </tr>
      {ads2.map(name => (
        <tr style={ (name.index)%2==0 ? {backgroundColor: 'white'}: {backgroundColor: '#ECECEC'}}>
        <td style={{textAlign: 'center'}}><p>{name.author.username}</p></td>
        <td style={{textAlign: 'center'}}><p>{name.title}</p></td>
        <td style={{textAlign: 'center'}}><p>{name.description}</p></td>
        <td style={{textAlign: 'center'}}><p>{name.budget}</p></td>
        <td style={{textAlign: 'center'}}><p>{name.link}</p></td>
        <td style={{textAlign: 'center'}}><form method="PUT" style={{marginBottom: '10px'}}>
            <input type="submit" name="submit" className="btn btn-success" value="Accept" onClick={()=>accept(name)}/>
            </form>
            <form method="PUT">
            <input type="submit" name="submit" className="btn btn-danger" value="Decline" onClick={()=>decline(name)}/>
            </form></td>
        </tr>
      ))}
      </table>
      </div>
  </div>)
};

export default Admin;
