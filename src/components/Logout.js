import React, { useEffect, useState, useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import {Usercontext} from '../App';

const Logout = () => {
    const history= useNavigate();
    const callinfo = async()=>{
        try{
            const res= await fetch('https://ad-check.herokuapp.com/logout',{
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type":"application/json"
                },
                credentials: "include"
            });
            //const data= await res.json();
            //console.log(data);
            window.alert('You are successfully logged out');
            history("/");
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        callinfo();
    },[]);
    return (
        <div>
            
        </div>
    )
}

export default Logout

