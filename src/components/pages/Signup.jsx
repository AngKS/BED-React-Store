import React, { useState } from 'react'
import HeroSection from '../heroSection/HeroSection'
import { Link } from "react-router-dom"
import "../css/signup.css"
import Navbar from '../navbar/Navbar'
import axios from 'axios'
import Login from './Login'
import Footer from '../footer/Footer'

function Signup() {

    const [regEmail, setRegEmail] = useState()
    const [regPassword, setRegPassword] = useState()
    const [regUser, setRegUser] = useState()
    const [regType, setType] = useState("user")
    const [isValid, setValid] = useState(true)
    const [result, setResult] = useState()

    let comparePassword = (passwd) => {
        if (passwd !== regPassword) {
            setValid(false)
        }
        else {
            setValid(true)
        }
    }


    let submitUser = () => {
        isValid ? (
            axios({
                method: "POST",
                url: "https://react-game-marketplace.herokuapp.com/api/signup",
                data : {
                    username : regUser,
                    email : regEmail,
                    password : regPassword,
                    type : regType
                }
            }).then(res => {
                setResult(res.data.message)
            }).catch(err => setResult(err.response.data.message))
            
        ) : window.location.reload(false)
    }


    return (
        <div>
            <Navbar />
            <HeroSection content={
                <form action="login-form">
                    <h2>Registration</h2>
                    <input type="text" className="form-control" id="username" placeholder="Enter your username" required onChange={data => { setRegUser(data.target.value) }} />
                    <input type="email" className="form-control" id="email" placeholder="Enter your email" required onChange={data => { setRegEmail(data.target.value) }} />
                    <input type="text" className="form-control" id="password" placeholder="password" required onChange={data => setRegPassword(data.target.value)} />
                    <div className="form-group border-none">
                        <input type="text" className="form-control" id="password" placeholder="Confirm password" required onChange={data => comparePassword(data.target.value)} />
                        <div className="err">{isValid ? <p></p> : <div className="passwd text-danger">Password does not match.</div>}</div>
                    </div>
                    <div className="form-group border-none">
                        <select className="typeControl" id="type" onChange={data => setType(data.target.value)}>
                            <option disabled>-- Select one --</option>
                            <option>user</option>
                            <option>admin</option>
                        </select>
                        
                    </div>
                    
                    <div className="mt-5 align-items-center">
                        <div className="passwd my-2">{result && result}</div>
                        <div className="d-flex">
                            <button type="button" className="btn btn-danger" onClick={submitUser}>Submit</button>
                            <div className="passwd text-dark p-2">Already have an account?<Link to="/login"> Login</Link></div>
                        </div>
                    </div>

                </form>
            } />
            <Footer />
        </div>
    )
}

export default Signup
