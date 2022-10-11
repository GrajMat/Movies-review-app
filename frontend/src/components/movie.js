import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from "react-router-dom"
import moment from 'moment'

import MovieDataService from "../services/movies"

//bootstrap
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'



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
            <Container>
                <Row>
                    <Col>
                        <Image src={movie.poster ? movie.poster : "https://cdn.pixabay.com/photo/2022/04/17/20/44/film-noir-7138980_1280.jpg"} fluid />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">
                                {movie.title}
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {movie.fullplot}
                                </Card.Text>
                                {props.user && <NavLink to={"/movies/" + params.id + "/review"} >Add review</NavLink>}
                            </Card.Body>
                        </Card>
                        <br></br>
                        <h2>Reviews</h2>
                        <br></br>
                        {movie.reviews.map((review, index) => {
                            // console.log(index)
                            return (
                                <Card key={index}>
                                    <Card.Body>
                                        <h5>{review.name + " reviewed on " + parseDate(review.date)}</h5>
                                        <p>{review.review}</p>
                                        {

                                            props.user && props.user.id === review.user_id &&


                                            < Row >
                                                <Col>
                                                    {/* <NavLink to={{
                                                        pathname: "/movies/" + params.id + "/review",
                                                        state: {
                                                            currentReview: review
                                                        }
                                                    }}> */}
                                                    <NavLink to={"/movies/" + params.id + "/review"} state={{ currentReview: review }}

                                                    >
                                                        Edit
                                                    </NavLink>
                                                </Col>
                                                <Col>
                                                    <Button
                                                        variant="Link"
                                                        onClick={() => { deleteReview(review._id, index) }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </Col>
                                            </Row>
                                        }
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

export default Movie;