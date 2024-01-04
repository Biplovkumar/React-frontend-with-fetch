import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import config from "../utils/config";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    }, [])

    const collectData = async () => {
        console.warn(name, email, password);
        let result = await fetch(`${config.URL}register`, {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
       let res = await result.json();
       if (result?.status && result.status < 300) {
        localStorage.setItem("user", JSON.stringify(res.result))
        localStorage.setItem("token", JSON.stringify(res.auth))
        navigate('/')
       }else{
         alert(res?.result.toString())
       }
    }

    return (
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text" placeholder="Enter Name"
                value={name} onChange={(e) => setName(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter Email"
                value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <input className="inputBox" type="password" placeholder="Enter password"
                value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={collectData} className="appButton" type="button">Sign Up</button>
        </div>
    )
}
export default SignUp