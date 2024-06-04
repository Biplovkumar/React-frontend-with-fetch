import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from './../utils/config';

const Nav = () => {

    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/login')
    }


let name;
try {
    name = auth ? JSON.parse(auth)?.firstName : null;
} catch (error) {
  console.error("Error parsing JSON:", error);
}

let image
try {
    image = auth ? JSON.parse(auth)?.profileImage : null;
} catch (error) {
  console.error("Image Error parsing JSON:", error);
}
    return (
        <div>
            <img
            alt='logo'
            className='logo'
             onError={()=>{image = null}}
             src={image ? image : config.dummy} />
             {/* src={image ? config.image+image : config.dummy} /> */}
            {
                auth ?
                    <ul className="nav-ul">
                        <li><Link to="/">Products</Link></li>
                        <li><Link to="/add">Add Products</Link></li>
                        {/* <li><Link to="/update"> Update Products</Link></li> */}
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link onClick={logout} to="/login">Logout ({name})</Link></li>
                    </ul>
                    :
                    <ul className="nav-ul nav-right">
                        <li><Link to="/login">Login</Link></li>
                        <li> <Link to="/signup">Sign Up</Link></li>
                    </ul>
            }


        </div>
    )
}

export default Nav;