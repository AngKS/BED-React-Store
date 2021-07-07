import React, { useEffect, useState } from 'react'
import NewGame from '../admin/newGame/NewGame'
import NewCategory from '../admin/newCategory/NewCategory'
import Navbar from '../navbar/Navbar'
import HeroSection from '../heroSection/HeroSection'
import Footer from '../footer/Footer'

function MultiPage() {

    const [userLogin, setLoggedIn] = useState()
    const [pageState, setPgState] = useState()

    useEffect(() => {
        let loggedUser = JSON.parse(localStorage.getItem("user"))
        setLoggedIn(loggedUser)
    }, [])


    return (
        <div>
            <Navbar />
            {
                userLogin ? (
                    (userLogin[0].type == 'admin') ? (
                        <div className="container">
                            <div className="">
                                <ul className="nav panel-heading">
                                    <li className="nav-item">
                                        <a href="#" className="nav-link" onClick={() => { setPgState("addGame") }}>Add Game</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link" onClick={() => { setPgState("addCategory") }}>Add Category</a>
                                        
                                    </li>
                                </ul>
                                {
                                    pageState == "addGame" ? <NewGame token={localStorage.getItem('token')} /> : <NewCategory token={localStorage.getItem('token')} />
                                }
                            </div>
                            
                            
                        </div>
                        
                    ) : "USer"
                ) : <HeroSection content="Site under Construction" />
                
            }
            <Footer />
        </div>
    )
}

export default MultiPage
