import React, {useState, useContext} from 'react'
import { NavLink, useNavigate} from 'react-router-dom'

const Userlogin = () => {

    const history= useNavigate();
    const [user, setuser] = useState({
        email:"",  password:""});

    let name, value;
    const handleinput= (e) =>{
        name= e.target.name;
        value= e.target.value;
        setuser({...user, [name]:value});
    }
    const postdata= async(e) =>{
        e.preventDefault();
        const {email, password}  = user;
        console.log("email "+email);
        console.log("password "+password);
        if(email===""||password==="")
        {
            window.alert("Data is empty");
        }
        else{
            const res= await fetch("https://ad-check.herokuapp.com/login", {
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email:email,
                    password:password,
                    check:"OK"
                }),
                credentials: "include"
            });
            const data= await res.json();
            console.log("data is "+data.message);
            console.log("status is "+res.status);
            if(res.status=="400" || !data)
            {
                window.alert("Invalid Credentials");
            }
            else{
                history(`/user/${data.message}`);
            }
        }
    }

  return (<div>
      <div>
        <div className='container'>
        <div style={{maxWidth: '600px', width: '90%', marginLeft: 'auto', border: '5px solid black', marginRight: 'auto', marginTop: '100px', backgroundColor: '#DFFEA8', padding: '20px', borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h1 style={{textAlign: 'center'}}>User Login</h1>
            <form method="POST" className="validated-form" noValidate>
        <div className="mb-3">
            <label for="email" class="form-label">Email</label>
                <input type="text" id="email" className="form-control" name="email" value={user.email} onChange={handleinput} required/>
        </div>
        <div className="mb-3">
            <label for="password" class="form-label">Password</label>
                <input type="password" id="password" className="form-control" name="password" value={user.password} onChange={handleinput} required/>
        </div>
        <div className="form-group form-button" style={{textAlign: 'center'}}>
        <input type="submit" name="submit" className="btn btn-dark" value="Login" onClick={postdata}/>
    </div>
    </form>
    </div>
        </div>
        </div>
  </div>)
};

export default Userlogin;
