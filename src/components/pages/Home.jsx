import React from 'react'
import HeroSection from '../heroSection/HeroSection'
import Main from '../homeMain/Main'
import Navbar from '../navbar/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../footer/Footer'


function Home() {
    return (
        <div>
            <Navbar />
            <HeroSection content={
            <div>
                <h1>Experience the Latest and Greatest</h1>
                <Link to="/store"><button className="btn btn-success text-center p-2">Go to Shop</button></Link>
            </div>
            } />
            <Main />
            <Footer />
        </div>
    )
}

export default Home
