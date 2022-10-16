import React from 'react';
import { NavLink } from 'react-router-dom'

const MobileNav = (props) => {

    const { showNavigation, hideMobileNav, logout, user, location } = props
    return (
        <>
            <nav className='mobileNav'>
                <div onClick={showNavigation} className="menuBtn">
                    <div className="btnBurger"></div>
                </div>
                <ul className='navList' onClick={hideMobileNav}>
                    <li>
                        <NavLink to={"/movies"}>Movies</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/about"}>About</NavLink>
                    </li>
                    <li>
                        {
                            user ? (<button onClick={logout}>Logout</button>) : (<NavLink to={"/Login"} state={{ prevLocation: location.pathname }}>Login</NavLink>)
                        }
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default MobileNav;