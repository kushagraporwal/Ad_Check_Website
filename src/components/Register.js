import React, {useState} from 'react';
import { NavLink, useNavigate} from 'react-router-dom'

const Register = () => {
    const history= useNavigate();
    const [user, setuser] = useState({
        username:"", name:"", email:"", password:"", cpassword:""});

    let name, value;
    const handleinput= (e) =>{
        name= e.target.name;
        value= e.target.value;
        setuser({...user, [name]:value});
    }

    const postdata= async(e) =>{
        //console.log();
        e.preventDefault();
        const {username, name, email, password, cpassword}  = user;
        //console.log(email);
        //console.log(username);
        if(email===""||username===""||name===""||password===""||cpassword==="")
        {
            window.alert("Data is empty");
        }
        else{
        const res= await fetch("https://ad-check.herokuapp.com/register", {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username:username,
                name:name,
                email:email,
                password:password,
                cpassword:cpassword,
                check:"OK"
            }),
            credentials: "include"
        });
        const data= await res.json();
        console.log('data of register is');
        console.log(data);
        console.log('status is');
        console.log(data.status);
        if(res.status=='422'||!data)
        {
            window.alert("Invalid Registeration");
            setuser({username:"",name:"",email:"", password:"", cpassword:""});
        }
        else
        {
        window.alert("Registeration successfull");
        history("/userlogin");
        }
    }
    }

  return (
    <>
    <div className='container'>
    <div style={{maxWidth: '600px', width: '90%', border: '5px solid black', marginLeft: 'auto', marginRight: 'auto', marginTop: '50px', backgroundColor: '#F9F4D1', padding: '20px', borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
    <h1 style={{textAlign: 'center'}}>Register</h1>

    <form method="POST" className="validated-form" noValidate>

    <div class="mb-3">
    <label for="username" className="form-label">Username</label>
        <input type="text" id="username" className="form-control" name="username" value={user.username} onChange={handleinput} required/>
    </div>

    <div class="mb-3">
    <label for="name" className="form-label">Name</label>
        <input type="text" id="name" className="form-control" name="name" value={user.name} onChange={handleinput} required/>
    </div>

    <div class="mb-3">
    <label for="email" className="form-label">Email </label>
        <input type="email" id="email" className="form-control" name="email" value={user.email} onChange={handleinput} required/>
    </div>

    <div class="mb-3">
    <label for="password" className="form-label">Password</label>
        <input type="password" id="password" className="form-control" name="password" value={user.password} onChange={handleinput} required/>
    </div>

    <div class="mb-3">
    <label for="cpassword" className="form-label">Confirm Password</label>
        <input type="password" id="cpassword" className="form-control" name="cpassword" value={user.cpassword} onChange={handleinput} required/>
    </div>

    <div className="form-group form-button" style={{textAlign: 'center'}}>
    <input type="submit" name="submit" className="btn btn-dark" value="Register" onClick={postdata}/>
    </div>
    </form>
    </div>
    </div>
</>
);
};

export default Register;
