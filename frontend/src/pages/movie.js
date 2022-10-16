import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from "react-router-dom"
import moment from 'moment'

import MovieDataService from "../services/movies"

import './movie.css'

const Movie = props => {
    const params = useParams()

    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: []
    })

    const getMovie = id => {
        MovieDataService.get(id)
            .then(response => {
                setMovie(response.data)
                // console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        getMovie(params.id)
    }, [params.id]);

    const parseDate = (date) => {
        return moment(date).format("Do MMMM YYYY")
    }


    const deleteReview = (reviewId, index) => {
        MovieDataService.deleteReview(reviewId, props.user.id)

            .then(response => {
                setMovie((prevState) => {
                    prevState.reviews.splice(index, 1)
                    return ({ ...prevState })
                })
            })
            .catch(e => {
                console.log(e)
            })
    }






    return (
        <div className="wrapper">
            <div className="container">
                <div className='movieBox'>
                    <div className="imgBox">
                        <img src={movie.poster ? movie.poster : "https://cdn.pixabay.com/photo/2022/04/17/20/44/film-noir-7138980_1280.jpg"} alt="movie poster" />

                    </div>
                    <div className='contentBox'>
                        <NavLink className="backToMoviesBtn" to={"/movies"} >Back to Movies</NavLink>
                        <h3>{movie.title}</h3>
                        <p>{movie.fullplot}</p>
                        {props.user && <NavLink to={"/movies/" + params.id + "/review"} >Add review</NavLink>}
                        <br></br>
                        <h3>Reviews</h3>
                        <ul>
                            {movie.reviews.map((review, index) => {
                                // console.log(index)
                                return (
                                    <li key={index}>
                                        <h6>{review.name + " reviewed on " + parseDate(review.date)}</h6>
                                        <p>{review.review}</p>
                                        <div>
                                            {

                                                props.user && props.user.id === review.user_id &&

                                                <>
                                                    <NavLink to={"/movies/" + params.id + "/review"} state={{ currentReview: review }}>
                                                        Edit
                                                    </NavLink>

                                                    <button onClick={() => { deleteReview(review._id, index) }}>
                                                        Delete
                                                    </button>
                                                </>


                                            }
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>

                    </div>
                </div>
            </div>

        </div >
    );
}

export default Movie;