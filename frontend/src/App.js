import React, { useState } from 'react';
import { NavLink, Routes, Route, useLocation, useNavigate } from "react-router-dom"

import AddReview from './pages/add-review'
import Login from './pages/login'
import Movie from './pages/movie'
import MoviesList from './pages/movies-list'
import PageNotFound from './pages/404';


import './App.css';


function App() {

    const location = useLocation()
    const navigate = useNavigate()

    const [user, setUser] = useState(null);
    // const [moviePath, setMoviePath] = useState("")

    const login = async (user = null) => {
        setUser(user)
    }

    const logout = async () => {
        setUser(false)
        if (location.pathname.slice(-6) === "review") {
            navigate('/movies')
        }
        console.log(location.pathname.slice(-6))
    }




    return (
        <>
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
                                user ? (<button onClick={logout}>Logout</button>) : (<NavLink to={"/Login"} state={{ prevLocation: location.pathname }}>Login</NavLink>)
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

        </>
    );
}

export default App;
