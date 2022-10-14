import React, { useState } from 'react';
import { NavLink, BrowserRouter as Router, Routes, Route } from "react-router-dom"

import AddReview from './components/add-review'
import Login from './components/login'
import Movie from './components/movie'
import MoviesList from './components/movies-list'
import PageNotFound from './components/404';


import './App.css';


function App() {

    const [user, setUser] = useState(null);
    // const [moviePath, setMoviePath] = useState("")

    const login = async (user = null) => {
        setUser(user)
    }

    const logout = async () => {
        setUser(false)
    }

    // const getLocation = (id) => {
    //     if (id !== undefined) {
    //         setMoviePath(id)
    //     }
    // }



    return (

        < Router >
            <header>
                <div className="logo">
                    <NavLink to={"/movies"}>Movies Review</NavLink>
                </div>
                <nav>
                    <ul>
                        <li>
                            <NavLink to={"/movies"}>Movies</NavLink>
                        </li>
                        <li>
                            {
                                user ? (<button onClick={logout}>Logout</button>) : (<NavLink to={"/Login"}>Login</NavLink>)
                            }
                        </li>
                    </ul>

                </nav>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<MoviesList />} />
                    <Route path="/movies" element={<MoviesList />} />
                    <Route path="/movies/:id/review" element={<AddReview user={user} />} />
                    <Route path="/movies/:id/" element={<Movie user={user} />} />
                    <Route path="/login" element={<Login login={login} />} />
                    <Route path="*" element={<PageNotFound />} />

                </Routes>
            </main>

        </Router >
    );
}

export default App;
