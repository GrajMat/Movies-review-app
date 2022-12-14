import React from 'react';

import './about.css'
const About = () => {
    return (
        <div className="wrapper">
            <div className="container">
                <div className="about">
                    <p><strong>Movies Review</strong>is an application createt by Mateusz Grajko using <strong>Node.js, Express.js, MongoDB and React.</strong></p>
                    <p>This application is used to search for movies by title or rating, and allows you to add reviews and then edit or delete them (options visible after logging in).</p>
                    <p>Keep in mind that this isn't a fully functioning application. The login form is simplified as much as possible and users are not stored in the database. You can enter any username and password (id). If you repeat these details the next time you log in, you will have access to edit and delete reviews</p>
                    <p>Thanks for stopping by.</p>
                </div>
            </div>
        </div>
    );
}

export default About;