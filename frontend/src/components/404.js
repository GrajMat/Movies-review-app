import React from 'react';
import { NavLink } from 'react-router-dom'

import './404.css'

const PageNotFound = () => {
    return (
        <div className="wrapper">
            <div className="container">
                <div className='notFoundBox'>
                    <h2>Page not found!</h2>
                    <NavLink to={"/movies"}>Back to Movies</NavLink>
                </div>

            </div>

        </div>
    );
}

export default PageNotFound;