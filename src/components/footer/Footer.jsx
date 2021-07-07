import React, { useEffect, useState } from 'react'
import "./footer.css"

function Footer() {

    const [loggedIn, setLoggedIn] = useState()

    let logOut = () => {
        localStorage.clear()
        window.location.reload(false)
    }

    useEffect(() => {
        let loggedUser = JSON.parse(localStorage.getItem("user"))
        setLoggedIn(loggedUser)
    }, [])

    return (
        <div className="footer text-light p-5">
            <div className="section d-inline-flex mx-4">
                <div className="columns">
                    created by: Ang Kah Shin
                </div>
                <div className="columns mx-4">
                    <a href="https://www.github.com/angks"><i className="fab fa-github text-decoration-none"/></a>
                </div>
                {loggedIn && <button className="btn btn-danger justify-content-end" onClick={logOut}>Log out</button>}
            </div>
            <hr/>
            
            <div className="section text-center">
                Copyright &copy; 2021 AKS inc. All Rights Reserved.
            </div>
        </div>
    )
}

export default Footer
