import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import config from "../utils/config";

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("male");
    const [dateOfBirth, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [zipcode, setZipCode] = useState("");
    const [consent, setConsent] = useState("");

    const navigate = useNavigate();
    
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    }, [])

    const collectData = async () => {
        console.warn(firstName, lastName, email, mobile, password, gender, address, zipcode, consent);
        if (firstName && lastName && email && mobile && password && gender && address && zipcode && consent) {
        let result = await fetch(`${config.URL}register`, {
            method: 'post',
            body: JSON.stringify({ firstName, lastName, email, mobile, password, gender, dateOfBirth, address, zipcode}),
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
       }}
       else{
         alert("All fields are required")
       }
    }

    return (
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text" placeholder="Enter First Name"
                value={firstName} onChange={(e) => setFirstName(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter Last Name"
                value={lastName} onChange={(e) => setLastName(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter Email"
                value={email} onChange={(e) => setEmail(e.target.value)}
            />

            <div className="inputBox">
            <label>Gender: </label>  
            <label>
                <input type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)}/> Male
            </label>
            <label>
                <input type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)}/> Female
            </label>
            </div>

            <div className="inputBox">
            <label for="dateOfBirth">Date of Birth:  </label>
            <input className="datePicker" type="date" id="dateOfBirth" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDob(e.target.value)} />
            </div>

            <input className="inputBox" type="number" placeholder="Enter Mobile"
                value={mobile} onChange={(e) => setMobile(e.target.value)} maxLength={10}
            />
            <input className="inputBox" type="password" placeholder="Enter password"
                value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter Address"
                value={address} onChange={(e) => setAddress(e.target.value)}
            />
            <input className="inputBox" type='number' placeholder="Enter zipcode"
                value={zipcode} onChange={(e) => setZipCode(e.target.value)} maxlength={6}
            />

            <input className="checkBox" type="checkbox" id="consent" name="consent" onClick={(e) => setConsent(e.target.checked)}/>
            <label for="consent" class="consent-text">I agree to the terms and conditions</label>

            <button onClick={collectData} className="appButton" type="button">Sign Up</button>
        </div>
    )
}
export default SignUp