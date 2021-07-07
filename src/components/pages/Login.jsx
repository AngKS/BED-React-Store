import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from "axios"
import HeroSection from '../heroSection/HeroSection'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

function Login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [result, setResult] = useState()
    const [loggedIn, setLoggedIn] = useState()
    

    let submitForm = () => {
        axios({
            method : "POST",
            url: "https://react-game-marketplace.herokuapp.com/api/login",
            headers: {'Access-Control-Allow-Origin': 'https://bed-react-store.netlify.app/'},
            data : {
                email : email,
                password : password
            }
        }).then(res => {
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("user", res.data.UserData)
            setResult(res.status)
            setLoggedIn({})
        })

    }

    let logOut = () => {
        localStorage.clear()
        window.location.reload(false)
    }

    useEffect(() => {
        let loggedUser = JSON.parse(localStorage.getItem("user"))
        setLoggedIn(loggedUser)
    }, [result])

    let userInfo = () => {
        return JSON.parse(localStorage.getItem("user"))[0]
    }

    return (
        
        <div className="">
            <Navbar />
            <HeroSection content={
                (!loggedIn) ? (
                    <form action="login-form ">
                            <h2>Welcome, Please Sign-in</h2>
                            <div className="form-group">
                                <input type="email" className="form-control" id="email" placeholder="email" required="required" onChange={data => { setEmail(data.target.value) }} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" id="password" placeholder="password" required="required" onChange={data => setPassword(data.target.value)} />

                            </div>

                            <div className="">
                                <button type="button" className="btn btn-info" onClick={submitForm}>Login</button>
                                <Link to="/signup" className="btn btn-default">Sign up</Link>
                            </div>

                        </form>
                    
                    ): (
                        <div>
                            <h1>Welcome</h1>
                            <p>{userInfo().username}</p>
                            <button className="btn btn-danger" onClick={logOut}>Log out</button>
                        </div> 
                    )

                
            } />
            <Footer />
        </div>
    )
}

export default Login
