import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import config from "../utils/config";

const UpdateProfile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("male");
    const [dateOfBirth, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [zipcode, setZipCode] = useState("");
    const [image, setImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const navigate = useNavigate();
    
    useEffect(() => {
        getUserDetails();
    }, [])

    let token = localStorage.getItem('token')
        try {
            token = token ? `bearer ${JSON.parse(token)}` : null;
        } catch (error) {
          console.error("Error parsing JSON token:", error);
        }


    const getUserDetails = async () => {
       const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch(`${config.URL}user/${userId}`,{
             headers:{ authorization:token }
        });
       let res = await result.json();
       if (result?.status && result.status < 300) {
        setFirstName(res?.firstName);
        setLastName(res?.lastName);
        setEmail(res?.email);
        setMobile(res?.mobile);
        setGender(res?.gender);
        setDob(res?.dateOfBirth);
        setAddress(res?.address);
        setZipCode(res?.zipcode);
        setSelectedImage(res?.profileImage)
       }else{
         alert(res?.result.toString())
       }
    }

    const updateUser = async () => {
        console.warn(firstName, lastName, email, mobile, gender, address, zipcode);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        if (firstName && lastName && email && mobile && gender && address && zipcode) {
        let formData = new FormData();
        if (image) {formData.append('profileImage', image);}
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('mobile', mobile);
        formData.append('gender', gender);
        formData.append('address', address);
        formData.append('zipcode', zipcode);

        let result = await fetch(`${config.URL}updateUser/${userId}`, {
            method: 'put',
            body: formData,
             headers:{"authorization":token 
             // "Content-Type": "multipart/form-data"
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
       else{
         alert("All fields are required")
       }
    }


   const handleImageChange = (e) => {
     const file = e.target.files[0];
     setImage(file);
   };


    return (
        <div className="register">

            <h1>Update Profile</h1>

            <div className="inputBox">
            <input type="file" id="imageInput" onChange={handleImageChange}/>

             {selectedImage || image ? (
             <img src={image ? URL.createObjectURL(image) : selectedImage ? `${config.image}${selectedImage}` : null} 
                  onError={()=>setSelectedImage(null)} alt="Selected" className="imgNew" />): null}

            </div>

            <input className="inputBox" type="text" placeholder="Enter First Name"
                value={firstName} onChange={(e) => setFirstName(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter Last Name"
                value={lastName} onChange={(e) => setLastName(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter Email"
                value={email} disabled
            />

            <div className="inputBox">
            <label>Gender: </label>  
            <label>
                <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)}/> Male
            </label>
            <label>
                <input type="radio" name="gender" value="female" checked={gender !== 'male'} onChange={(e) => setGender(e.target.value)}/> Female
            </label>
            </div>

            <div className="inputBox">
            <label>Date of Birth:  </label>
            <input className="datePicker" type="date" id="dateOfBirth" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDob(e.target.value)} />
            </div>

            <input className="inputBox" type="number" placeholder="Enter Mobile"
                value={mobile} onChange={(e) => setMobile(e.target.value)} maxLength={10}
            />

            <input className="inputBox" type="text" placeholder="Enter Address"
                value={address} onChange={(e) => setAddress(e.target.value)}
            />
            <input className="inputBox" type='number' placeholder="Enter zipcode"
                value={zipcode} onChange={(e) => setZipCode(e.target.value)} maxLength={6}
            />

            <button onClick={updateUser} className="appButton" type="button">Update</button>
        </div>
    )
}
export default UpdateProfile