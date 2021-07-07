import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import HeroSection from '../heroSection/HeroSection'
import Navbar from '../navbar/Navbar'
import axios from 'axios'


function Cart() {

    const [loggedIn, setLoggedIn] = useState()
    const [user, setUser] = useState()
    const [cartItems, setCartItems] = useState([])
    
    
    

    useEffect(() => {
        try{
            let products = localStorage.getItem('cart').split(",")
            setCartItems(products)
            // console.log(typeof products.split(","));
            products.map(num => {
                axios.get(`https://react-game-marketplace.herokuapp.com/game/${num}`).then(res => {
                    const productData = res.data
                    // console.log(JSON.stringify(productData[0]))
                    setCartItems([...cartItems, JSON.stringify(productData)])
                })
            })
            console.log("I am cart:" + cartItems);
            
        }
        catch {
            let products = "None"
            return products
        }

    }, [])

    return (
        <div>
            <Navbar />

            {/* <HeroSection content = "Site under Construction" /> */}


            <h3 className="text-center">Your cart</h3>
            <div className="container">
                {
                    (cartItems.length > 0) ?
                        // productDesc.map(product => {
                        //     return <p>{product}</p>
                        // })
                        // console.log(cartItems.length)
                        cartItems.map(product => {
                            return <p>{product}</p>
                        })
                        :
                        
                        <div className="text-center mt-5">
                            
                            <p className="text-muted">Nothing in your cart</p>
                            <Link to="store"><button className="btn btn-success">Shop now</button></Link>
                        </div>
                }
            </div>

        </div>
    )
}

export default Cart
