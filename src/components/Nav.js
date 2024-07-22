import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import config from './../utils/config';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const checkPath = (path) => {
        return pathname.includes(path);
    };


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
                onError={() => { image = null }}
                src={image ? image : config.dummy} />
            {/* src={image ? config.image+image : config.dummy} /> */}
            {
                auth ?
                    <ul className="nav-ul">
                        <li><Link className={pathname === '/' ? 'nav-link' : ''} to="/">Products</Link></li>
                        <li><Link className={checkPath('/add') ? 'nav-link' : ''} to="/add">Add Products</Link></li>
                        <li><Link className={checkPath('/profile') ? 'nav-link' : ''} to="/profile">Profile</Link></li>
                        <li><Link onClick={logout} to="/login">Logout ({name})</Link></li>
                    </ul>
                    :
                    <ul className="nav-ul nav-right">
                        <li><Link className={checkPath('/login') ? 'nav-link' : ''} to="/login">Login</Link></li>
                        <li><Link className={checkPath('/signup') ? 'nav-link' : ''} to="/signup">Sign Up</Link></li>
                        <li><Link className={checkPath('/contactus') ? 'nav-link' : ''} to="/contactus">Contact Us</Link></li>
                    </ul>
            }


        </div>
    )
}

export default Nav;