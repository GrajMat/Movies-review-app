import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = (props) => {
    const { logout, user, location } = props

    return (
        <>
            <nav>
                <ul>
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

export default Nav;