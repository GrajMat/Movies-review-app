import React, { useState } from 'react';
import { NavLink, Routes, Route, useLocation, useNavigate } from "react-router-dom"

import AddReview from './pages/add-review'
import Login from './pages/login'
import About from './pages/about'
import Movie from './pages/movie'
import MoviesList from './pages/movies-list'
import PageNotFound from './pages/404';
import MobileNav from './components/MobileNav';
import Nav from './components/Nav';


import './App.css';
import Media from 'react-media'


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
    }

    const showNavigation = () => {
        const btn = document.querySelector('.menuBtn')
        const navList = document.querySelector('.navList')
        btn.classList.toggle("visible")
        navList.classList.toggle('fullscreen')

    }
    const hideMobileNav = () => {
        const btn = document.querySelector('.menuBtn')
        const navList = document.querySelector('.navList')

        if (btn.className.indexOf("visible") !== -1) {
            btn.classList.remove("visible")
        }
        if (navList.className.indexOf("fullscreen") !== -1) {
            navList.classList.remove("fullscreen")
        }
    }


    return (
        <>
            <header>
                <div className="logo">
                    <NavLink to={"/movies"}>Movies Review</NavLink>
                </div>
                <Media query="(max-width: 767px)">
                    {matches => {
                        return matches ? <MobileNav showNavigation={showNavigation} hideMobileNav={hideMobileNav} logout={logout} user={user} location={location} />
                            :
                            <Nav logout={logout} user={user} location={location} />
                    }}
                </Media>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<MoviesList />} />
                    <Route path="/movies" element={<MoviesList />} />
                    <Route path="/movies/:id/review" element={<AddReview user={user} />} />
                    <Route path="/movies/:id/" element={<Movie user={user} />} />
                    <Route path="/login" element={<Login login={login} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<PageNotFound />} />

                </Routes>
            </main>

        </>
    );
}

export default App;
