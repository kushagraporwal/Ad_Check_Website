import React, { useEffect, useState, useContext } from 'react';
import {useNavigate, useParams, useLocation, NavLink} from 'react-router-dom'

const User = () => {

  const history= useNavigate();
  const location = useLocation();
  const {userid}= useParams();
  console.log("userid is "+ userid);
  const [userdata, setdata]= useState({});
  const [advt, setadvt] = useState({
    title:"", description:"", budget:0, link:""});

    let name, value;
    const handleinput= (e) =>{
        name= e.target.name;
        value= e.target.value;
        setadvt({...advt, [name]:value});
    }

  const callinfo = async()=>{
    try{
        console.log('welcome');
        const res= await fetch(`https://ad-check.herokuapp.com/${userid}/info`,{
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
            history('/userlogin');
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

const send =async(e)=>{
  e.preventDefault();
  const {title, description, budget, link}= advt;
  try{
    if(title===""||description===""||budget==" "||link==="")
        {
            window.alert("Data is empty");
        }
        else{
    console.log("advt is "+ advt);
    const res= await fetch('https://ad-check.herokuapp.com/createad',{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
          title:title,
          description:description,
          budget:budget,
          link:link,
          check:"OK"
        })
    });
    const data= await res.json();
    console.log('req is');
    console.log(data);
    if(data=="-8")
    {
        window.alert('Invalid data');
    }
    else
    {
        window.alert('Ad added successfully!');
    }
    console.log(data);
    window.location.reload();
    setadvt({title:"",description:"",budget: 0, link:"",});
  }
}
catch(err){
    console.log(err);
}
}

const username= userdata.username;
const userads= userdata.userads;

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
    console.log("ads array is ");
console.log(ads2);


useEffect(() => {
  callinfo();
},[]);

  return (
  <div>
  <div className="container-fluid">
  <div className='row' style={{marginBottom: '30px'}}>
  <div className='col-6'>
      <h1 style={{marginTop: '20px', textAlign: 'center', fontWeight: 'bold'}}>Hello {username}</h1>
      </div>
      <div className='col-6'>
      <button type="button" class="btn btn-primary" style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px'}}><NavLink className="nav-link" to="/logout" style={{color: 'white', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto'}}>Logout</NavLink></button>
      </div></div>
        <div style={{backgroundColor: '#C2FEEF',maxWidth: '600px', width: '90%', marginBottom: '50px', marginLeft: 'auto', marginRight: 'auto', border: '5px solid black', borderRadius: '5px', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', paddingLeft: '10px', paddingRight: '5px'}}>
      <form method="POST" >
      <h2 style={{textAlign: 'center'}}>Create an Ad</h2>
      <div class="mb-3">
      <label for="title" className="form-label">Title</label>
        <textarea name="title" id="title" value={advt.title} onChange={handleinput} style={{border: '1px solid black', borderRadius: '5px',display: 'flex', width: '90%', boxSizing: 'border-box'}}></textarea>
        </div>

        <div class="mb-3">
        <label for="description" className="form-label">Description</label>
        <textarea name="description" id="description" rows="4" value={advt.description} onChange={handleinput} style={{border: '1px solid black',borderRadius: '5px',display: 'flex', width: '90%', boxSizing: 'border-box'}}></textarea>
        </div>

        <div class="mb-3">
    <label for="budget" className="form-label">Budget</label>
        <input type="number" id="budget" className="form-control" name="budget" value={advt.budget} onChange={handleinput} style={{border: '1px solid black'}} required/>
    </div>

    <div class="mb-3">
    <label for="link" className="form-label">Link</label>
        <input type="text" id="link" className="form-control" name="link" value={advt.link} onChange={handleinput} style={{border: '1px solid black'}} required/>
    </div>
        <div className="form-group form-button" style={{textAlign: 'center'}}>
        <button className="btn btn-dark" onClick={send} style={{marginRight: '0px'}}>Submit</button>
        </div>
        </form>
        </div>

        <table style={{marginLeft: 'auto', marginRight: 'auto',boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', width: '80%', marginBottom: '100px'}}>
        <tr style={{backgroundColor: '#3D3A3A', color: 'whitesmoke'}}>
        <th style={{width: '100px', textAlign: 'center', paddingTop: '15px', paddingBottom: '15px'}}>Title</th>
        <th style={{width: '200px', textAlign: 'center', paddingTop: '15px', paddingBottom: '15px'}}>Description</th>
        <th style={{width: '80px', textAlign: 'center', paddingTop: '15px', paddingBottom: '15px'}}>Budget</th>
        <th style={{width: '150px', textAlign: 'center', paddingTop: '15px', paddingBottom: '15px'}}>Link</th>
        <th style={{width: '100px', textAlign: 'center', paddingTop: '15px', paddingBottom: '15px'}}>Approve</th>
        </tr>
  {ads2.map(name => (
      <tr style={ (name.index)%2==0 ? {backgroundColor: 'white'}: {backgroundColor: '#ECECEC'}}>
        <td style={{textAlign: 'center'}}><p>{name.title}</p></td>
        <td style={{textAlign: 'center'}}><p>{name.description}</p></td>
        <td style={{textAlign: 'center'}}><p>{name.budget}</p></td>
        <td style={{textAlign: 'center'}}><p>{name.link}</p></td>
        <td style={{textAlign: 'center'}}><p>{((name.checked==false) ? <p style={{color: '#FFE807', fontWeight: 'bold'}}>Pending</p> : ((name.accepted==true) ? <p style={{color: 'green', fontWeight: 'bold'}}>Approved</p> : <p style={{color: 'red', fontWeight: 'bold'}}>Rejected</p>))}</p></td>
        </tr>
      ))}
      </table>
      </div>
  </div>)
};

export default User;
