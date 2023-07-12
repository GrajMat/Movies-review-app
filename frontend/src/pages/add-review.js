import React, { useState } from 'react'
import { useLocation, useParams, NavLink } from 'react-router-dom'

import MovieDataService from "../services/movies"

import './add-review.css'

const AddReview = props => {
    const params = useParams()
    // const navigate = useNavigate()
    const location = useLocation()

    let editing = false
    let initialReviewState = ""
    if (location.state && location.state.currentReview) {
        editing = true
        initialReviewState = location.state.currentReview.review

    }
    // console.log(location.state.currentReview)

    const [review, setReview] = useState(initialReviewState)
    const [submitted, setSubmitted] = useState(false)

    const onChangeReview = e => {
        const review = e.target.value
        setReview(review)
    }

    const saveReview = () => {
        const data = {
            review: review,
            name: props.user.name,
            user_id: props.user.id,
            movie_id: params.id // get movie id from url
        }

        if (editing) {
            data.review_id = location.state.currentReview._id
            MovieDataService.updateReview(data)

                .then(response => {
                })
                .catch(e => {
                    console.log(e)
                })
            setSubmitted(true)

        } else {
            MovieDataService.createReview(data)
                .then(response => {
                })
                .catch(e => {
                    console.log(e)
                })
            setSubmitted(true)

        }


        // navigate("/movies/" + params.id)
    }



    return (
        <div className='wrapper'>
            <div className="container">
                <div className="addReview">
                    {
                        submitted ? (
                            < div >
                                <h4>Review submitted successfully</h4>
                                <NavLink to={"/movies/" + params.id}>Back to movie</NavLink>
                            </div>
                        ) : (
                            <form>
                                <h4>{editing ? "Edit " : "Create "}review </h4>
                                <label htmlFor="review"></label>
                                <textarea
                                    rows="3"
                                    required
                                    type="text"
                                    id="review"
                                    value={review}
                                    onChange={onChangeReview}
                                >
                                </textarea>
                                <button type="submit" onClick={saveReview}>Submit</button>
                            </form>
                        )
                    }
                </div>

            </div>

        </div >
    );
}

export default AddReview;