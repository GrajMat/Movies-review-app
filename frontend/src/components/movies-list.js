import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom"

import MovieDataService from "../services/movies"

//css
import './movies-list.css'


const MoviesList = () => {
    // console.log("renderowanie movies-list.js")

    const [movies, setMovies] = useState([])
    const [searchTitle, setSearchTitle] = useState("")

    const [searchRating, setSearchRating] = useState("")
    const [ratings, setRatings] = useState(["All Ratings"])

    const [currentPage, setCurrentPage] = useState(0)
    const [entriesPerPage, setEntriesPerPage] = useState(0)

    const [currentSearchMode, setCurrentSearchMode] = useState("")

    const retrieveMovies = () => {
        setCurrentSearchMode("")
        MovieDataService.getAll(currentPage)
            .then(response => {
                // console.log(response.data)
                setMovies(response.data.movies)
                setCurrentPage(response.data.page)
                setEntriesPerPage(response.data.entries_per_page)
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
    }, [currentSearchMode])
    useEffect(() => {
        retrieveMovies()
        retrieveRatings()
    }, [])

    useEffect(() => {
        retrieveNextPage()
    }, [currentPage])



    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value
        setSearchTitle(searchTitle);
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
            })
            .catch(e => {
                console.log(e)
            })
    }

    const findByTitle = () => {
        setCurrentSearchMode("findByTitle")
        find(searchTitle, "title")
    }
    const findByRating = () => {
        setCurrentSearchMode("findByRating")
        if (searchRating === "All Ratings") {
            retrieveMovies()
        } else {
            find(searchRating, "rated")
        }
    }


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
                        <button type="button" onClick={findByTitle}> Search</button>
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
                        <button type="button" onClick={findByRating}>Search</button>
                    </form>
                </div>

                <div className="movieList">
                    {

                        movies.map((movie, id) => {
                            return (
                                <div className="card" key={id}>
                                    <div className="imgBox">
                                        <img src={movie.poster ? movie.poster : "https://cdn.pixabay.com/photo/2022/04/17/20/44/film-noir-7138980_1280.jpg"} alt="movie poster" />
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
                    }
                </div>
                <div className="nextPageBtnBox">
                    <p>Page: {currentPage}</p>
                    <button onClick={() => { setCurrentPage(currentPage + 1) }} >Get next {entriesPerPage} results</button>
                </div>
            </div>

        </div >
    );
}

export default MoviesList;