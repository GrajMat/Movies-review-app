import React, { useState } from 'react'
import { useLocation, useNavigate, useParams, NavLink } from 'react-router-dom'

import MovieDataService from "../services/movies"

const AddReview = props => {
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    let editing = false
    let initialReviewState = ""
    if (location.state && location.state.currentReview) {
        editing = true
        initialReviewState = location.state.currentValue

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
                    setSubmitted(true)
                })
                .catch(e => {
                    console.log(e)
                })
        } else {
            MovieDataService.createReview(data)
                .then(response => {
                    setSubmitted(true)
                })
                .catch(e => {
                    console.log(e)
                })
        }


        navigate("/movies/" + params.id)
    }



    return (
        <div>
            {
                submitted ? (
                    < div >
                        <h4>Review submitted successfully</h4>
                        <NavLink to={"/movies/" + params.id}>Back to movie</NavLink>
                    </div>
                ) : (
                    <form>
                        <label htmlFor="review">{editing ? "Edit " : "Create "}Review </label>
                        <input
                            required
                            type="text"
                            id="review"
                            value={review}
                            onChange={onChangeReview}
                        />
                        <button type="submit" onClick={saveReview}>Submit</button>
                    </form>
                )
            }
        </div >
    );
}

export default AddReview;