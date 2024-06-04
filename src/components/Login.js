import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import config from '../utils/config';
const Login = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const callInitial = () => {
            const auth = localStorage.getItem('user');
            if (auth) navigate("/")
          }
          callInitial();
    }, [])

    const handleLogin = async () => {
        let result = await fetch(`${config.URL}login`, {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // if (result.auth) {
        let res = await result?.json();
       if (result?.status && result.status < 202) {
            localStorage.setItem('user', JSON.stringify(res.user));
            localStorage.setItem('token', JSON.stringify(res.auth));
            navigate("/")
       }else{
         alert(res?.result.toString())
       }
        // } else {
        //     alert("Please enter correct details")
        // }
    }

    return (
        <div className='login'>
            <h1>Login</h1>
            <input type="text" className="inputBox" placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type="password" className="inputBox" placeholder='Enter Password'
                onChange={(e) => setPassword(e.target.value)} value={password} />
            <button onClick={handleLogin} className="appButton" type="button">Login</button>
        </div>
    )
}

export default Login