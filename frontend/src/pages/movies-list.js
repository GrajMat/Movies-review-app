import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom"

import MovieDataService from "../services/movies"

import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

//css
import './movies-list.css'


const MoviesList = () => {

    const [movies, setMovies] = useState([])
    const [searchTitle, setSearchTitle] = useState("")

    const [searchRating, setSearchRating] = useState("")
    const [ratings, setRatings] = useState(["All Ratings"])

    const [currentPage, setCurrentPage] = useState(0)
    const [entriesPerPage, setEntriesPerPage] = useState(0)
    const [totalResults, setTotalResults] = useState(0)
    const [currentSearchMode, setCurrentSearchMode] = useState("")

    //Backdrop
    const [open, setOpen] = useState(true);
    const [noResultFound, setNoResultFound] = useState("");

    const handleClose = () => {
        setOpen(false);
        setNoResultFound("no results found")
    };




    const retrieveMovies = () => {
        setCurrentSearchMode("")
        MovieDataService.getAll(currentPage)
            .then(response => {
                // console.log(response.data)
                setMovies(response.data.movies)
                setCurrentPage(response.data.page)
                setEntriesPerPage(response.data.entries_per_page)
                setTotalResults(response.data.total_results)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const retrieveRatings = () => {
        MovieDataService.getRatings()
            .then(response => {
                // console.log(response.data)
                setRatings(["All Ratings"].concat(response.data))
            })
            .catch(e => {
                console.log(e)
            })
    }

    const retrieveNextPage = () => {
        if (currentSearchMode === "findByTitle") {
            findByTitle()
        } else if (currentSearchMode === "findByRating") {
            findByRating()
        } else {
            retrieveMovies()
        }

    }

    useEffect(() => {
        setCurrentPage(0)
    }, [])
    useEffect(() => {
        retrieveMovies()
        retrieveRatings()
    }, [])

    useEffect(() => {
        retrieveNextPage()
    }, [currentPage])



    const onChangeSearchTitle = e => {
        const searchTitleValue = e.target.value
        setSearchTitle(searchTitleValue);
        setCurrentPage(0)
        console.log("onChange: " + searchTitleValue)
        // if (searchTitle ) console.log("niepusty")
        findByTitle(searchTitleValue)

    }

    const onChangeSearchRating = e => {
        const searchRating = e.target.value
        setSearchRating(searchRating)
    }

    const find = (query, by) => {
        MovieDataService.find(query, by, currentPage)
            .then(response => {
                // console.log(response.data)
                setMovies(response.data.movies)
                setTotalResults(response.data.total_results)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const findByTitle = (searchTitleValue) => {
        // if (currentSearchMode !== "findByTitle") 
        setCurrentSearchMode("findByTitle")
        console.log("findByTitle: " + searchTitleValue)
        if (searchTitleValue || searchTitleValue === "") {
            find(searchTitleValue, "title")
            console.log("jest")
        } else {
            find(searchTitle, "title")
            console.log("nie ma")
        }
    }
    const findByRating = () => {
        setCurrentSearchMode("findByRating")
        if (searchRating === "All Ratings") {
            retrieveMovies()
        } else {
            find(searchRating, "rated")
        }
    }

    const onClickSearchTitle = () => {
        setCurrentPage(0)
        findByTitle()
    }
    const onClickSearchRating = () => {
        setCurrentPage(0)
        findByRating()
    }

    const movieList = movies.map((movie, id) => {
        return (
            <div className="card" key={id}>
                <div className="imgBox">
                    <NavLink to={"/movies/" + movie._id}>
                        <img src={movie.poster ? movie.poster : "https://cdn.pixabay.com/photo/2022/04/17/20/44/film-noir-7138980_1280.jpg"} alt="movie poster" />
                    </NavLink>

                </div>
                <div className="contentBox">
                    <h3>{movie.title}</h3>
                    <p className="text rating">Rating: {movie.rated}</p>
                    <p className="text desc">{movie.plot}</p>
                    <NavLink to={"/movies/" + movie._id}>View Reviews</NavLink>


                </div>

            </div>
        )
    })

    const pageChange = (e) => {
        const name = e.target.name
        if (name === "next" && currentPage + 1 < totalPages) {
            setCurrentPage(currentPage + 1)
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        } else if (name === "prev" && currentPage > 0) {
            setCurrentPage(currentPage - 1)
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }

    }

    const totalPages = Math.ceil(totalResults / entriesPerPage)

    return (
        <div className='wrapper'>
            <div className="container">
                <div className="searchForms">
                    <form action="">
                        <label htmlFor="searchByTitle"></label>
                        <input
                            type="text"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={onChangeSearchTitle}
                            id="searchByTitle"
                        />
                        <button type="button" onClick={onClickSearchTitle} name="search"> Search</button>
                    </form>
                    <form action="">
                        <label htmlFor="searchByRating"></label>
                        <select name="" id="searchByRating" onChange={onChangeSearchRating}>
                            {
                                ratings.map((rating, id) => {
                                    return (
                                        <option key={id} value={rating}>
                                            {rating}
                                        </option>
                                    )

                                })
                            }
                        </select>
                        <button type="button" onClick={onClickSearchRating}>Search</button>
                    </form>
                </div>

                <div className="movieList">
                    {movieList.length > 0 ? movieList :
                        <>
                            < Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={open}
                                onClick={handleClose}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                            <p className='noResults'>{noResultFound}</p>
                        </>

                    }
                </div>
                <div className="pageBtns">
                    <div className="nextPage">
                        <p>Page: <span>{currentPage + 1}</span> from <span>{totalPages ? totalPages.toString() : ""}</span></p>
                        <button
                            className={currentPage + 1 === totalPages ? "inactiveBtn" : ""}
                            onClick={(e) => pageChange(e)}
                            name="next"
                        >
                            Next page

                        </button>
                    </div>
                    <div >
                        <button onClick={(e) => pageChange(e)}
                            className={currentPage === 0 ? "inactiveBtn" : ""}
                            name="prev"
                        >
                            Previous page
                        </button>
                    </div>
                </div>
            </div>

        </div >
    );
}

export default MoviesList;