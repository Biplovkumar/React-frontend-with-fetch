import React from 'react';
import {
    Link, useNavigate
} from 'react-router-dom';

const Nav = () => {

    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }


let name;
try {
    name = auth ? JSON.parse(auth).name : null;
} catch (error) {
  console.error("Error parsing JSON:", error);
}


    return (
        <div>
            <img
            alt='logo'
            className='logo'
             src='https://biplovkumar.github.io/img/profile.jpg' />
            {
                auth ?
                    <ul className="nav-ul">
                        <li><Link to="/">Products</Link></li>
                        <li><Link to="/add">Add Products</Link></li>
                        {/* <li><Link to="/update"> Update Products</Link></li> */}
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link onClick={logout} to="/signup">Logout ({name})</Link></li>
                    </ul>
                    :
                    <ul className="nav-ul nav-right">
                        <li> <Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
            }


        </div>
    )
}

export default Nav;