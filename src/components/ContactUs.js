import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import config from '../utils/config';
const ContactUs = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();


    const handleSubmit = async () => {
        if (!name || !email || !subject) {
            alert('Please enter a name, email and subject')
            return false
        }
        let result = await fetch(`${config.URL}add-query`, {
            method: 'post',
            body: JSON.stringify({ name, email, phone, subject, description }),
            headers: { 'Content-Type': 'application/json' }
        });
        let res = await result?.json();
        if (result?.status && result.status < 202) {
            navigate("/")
        } else {
            alert(res?.result.toString())
        }
    }

    return (
        <div className='login'>
            <h1>Contact Us</h1>
            <input type="text" className="inputBox" placeholder='Enter Name'
                onChange={(e) => setName(e.target.value)} value={name} />
            <input type="text" className="inputBox" placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type="text" className="inputBox" placeholder='Enter Phone'
                onChange={(e) => setPhone(e.target.value)} value={phone} />
            <input type="text" className="inputBox" placeholder='Enter Subject'
                onChange={(e) => setSubject(e.target.value)} value={subject} />
            <input type="text" className="inputBox" placeholder='Enter Description'
                onChange={(e) => setDescription(e.target.value)} value={description} />

            <button onClick={handleSubmit} className="appButton" type="button">Submit</button>
        </div>
    )
}

export default ContactUs