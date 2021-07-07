import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import "./reviews.css"


function Reviews() {

    const [reviews, setReview] = useState()
    const [user, setUser] = useState()

    const [ratings, setRatings] = useState()
    const [userReview, setUserReview] = useState()
    const [submitted, setSubmit] = useState(false)
    const [avgRating, setAvgRating] = useState()
    
    useEffect(() => {
        let gameKey = localStorage.getItem("game")
        axios.get(`https://react-game-marketplace.herokuapp.com/reviews/${gameKey}`, { headers: {'Access-Control-Allow-Origin': 'https://bed-react-store.netlify.app/'}}).then(res => {
            const allReviews = res.data
            setReview(allReviews)
            
        })
        let userID = localStorage.getItem("user")
        userID = userID ? JSON.parse(userID)[0] : null
        setUser(userID)
    }, [])

    let sendReview = () => {
        let header = { 'authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': 'https://bed-react-store.netlify.app/' }
        axios({
            method : "POST",
            headers: header,
            url: "https://react-game-marketplace.herokuapp.com/reviews",
            data : {
                userID : user.userid,
                gameID : localStorage.getItem("game"),
                content : userReview,
                rating : (ratings ? ratings : "0"),
            }
        }).then(res =>{
            if (res.data.auth == false){
                return <div className="">Authorization Failed</div>
            }
            setSubmit(check => !check)
        })
    
        
        
    }

    let allRatings = 0
    useEffect(() => { 
        
        reviews ? 
            reviews.map(review => allRatings += review.rating) 
            : 
            allRatings += 0
        setAvgRating(Math.round(allRatings / (reviews ? reviews.length : 1)))
        
    }, [reviews])

    return (
        <div>
            <section className="reviews-container">
                <div className="border-top border-bottom py-3">
                    <h3 className="">Reviews <i><small>(max. 5 stars)</small></i></h3>
                    {console.log(avgRating)}
                    <h5 className="text-muted">Ratings: {avgRating ? [...new Array(avgRating)].map(star => <i className="fas fa-star text-warning" />) : "-"}</h5> 
                </div>
                {

                    reviews ? (
                        (reviews.length > 0) ? (
                            reviews.map(review => {
                                return (
                                    <div className="media review rounded">
                                        <div className="media-body">
                                            <div>
                                                {[...Array(review.rating)].map(star => {
                                                    return (<i className="fas fa-star text-warning" />)
                                                })}
                                            </div>
                                            <div className="ratingUser d-flex">
                                                <p className="metadata mr-auto"><small>by {review.username}</small></p>
                                                <p className="metadata"><small><i>~ Posted on {(review.created_at.slice(0, 10))}</i></small></p>
                                            </div>

                                            <p>{review.content}</p>
                                        </div>
                                        <hr />
                                    </div>

                                )
                            })
                        ) : (
                            <h5 className="text-secondary text-center my-5">No reviews found</h5>
                            
                        )
                        

                        )
                    :

                        (

                            <div className="">
                                
                                <h3>Loading...</h3>
                                <div class="spinner-border"></div>
                            </div>


                        )

                    

                }
            </section>
            <section className="newReview">
                <form onSubmit="">
                    <div className="form-group">
                        <label className="ratingLabel" htmlFor="ratings">Ratings:</label>
                        <input className="border-0" type="number" placeholder="0" max="5" min="0" onChange={data => setRatings(data.target.value)}/>
                        <i className = "fas fa-star text-muted" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="review">Your Review:</label>
                        <textarea className="form-control" rows="5" id="review" onChange={data => setUserReview(data.target.value)} required></textarea>
                        
                    </div>
                    {
                        (user == null) ? (
                            <p>Please <Link className="text-decoration-none text-important" to="/login">login</Link> to submit a review</p>
                        ): 
                        (
                            <div className="d-inline-flex">
                                {
                                    submitted ? (
                                        <button className="btn btn-success" disabled>Submitted!</button>
                                    ) : (
                                            <button type ="submit" class="btn btn-light" onClick={sendReview}>Submit</button>
                                    )
                                }
                                
                                <p className="m-0 align-items-center justify-content-end text-secondary p-3">You are submitting as: <i>{user.username}</i></p>
                            </div>
                        )
                        
                }
                </form>
            </section>
        </div >
    )
}

export default Reviews
