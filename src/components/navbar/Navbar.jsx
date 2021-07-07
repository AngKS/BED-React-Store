

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'


function Navbar() {

    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true)
    const [user, setUser] = useState()


    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)
    const showBtn = () => {
        if (window.innerWidth <= 960) {
            setButton(false)
        }
        else {
            setButton(true)
        }
    }
    const getUser = () => {
        let USER = localStorage.getItem('user')
        USER = USER ? JSON.parse(USER)[0] : null
        setUser(USER)
    }
    useEffect(() => {
        showBtn()
        getUser()
        
    }, [])

    window.addEventListener('resize', showBtn)
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        <h2>Game<i className="text-danger">SP</i>ot</h2>
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        
                        <li className='nav-item'>
                            <Link to='/store' className='nav-links' onClick={closeMobileMenu}>
                                Store
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/multipage' className='nav-links' onClick={closeMobileMenu}>
                                {
                                    user ? (
                                        (user.type == 'admin') ? "admin" : "user"
                                    ) : "Community"
                                }
                            </Link>
                        </li>
                        <li className='nav-item'>
                            {user ? (
                                <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                                    <i className="fas fa-user" /><span className="my-0 p-2">{user.username}</span>
                                </Link>
                            ) : (
                                <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                                    <i className="fas fa-user" />
                                </Link>
                                )
                            }
                        </li>
                        <li className='nav-item'>
                            <Link to='/cart' className='nav-links' onClick={closeMobileMenu}>
                                <i className="fas fa-shopping-cart" /><span className="my-0 p-2">Cart</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar
