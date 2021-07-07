import React, { useEffect } from 'react'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'
import Search from '../searchBar/Search'

function Store() {

    useEffect(() => {
    }, [])

    return (
        <div>
            <Navbar />

            <div className="container">
                <h1>Games Catalogue</h1>
                <hr />
                <Search />
            </div>
            <Footer />
        </div>
    )
}

export default Store
