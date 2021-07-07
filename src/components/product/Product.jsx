import React, { useState, useEffect } from 'react'
import "./product.css"
import axios from "axios"
import Reviews from '../reviews/Reviews'
import Games from '../games/Games'
import Navbar from '../navbar/Navbar'

function Product() {

    const [product, setProduct] = useState()
    const [pageState, setPgState] = useState("description")
    const [clicked, setClicked] = useState()

    useEffect(() => {
        let productKey = localStorage.getItem("game")
        console.log(productKey)
        axios.get(`https://react-game-marketplace.herokuapp.com/game/${productKey}`, { headers: {'Access-Control-Allow-Origin': 'https://bed-react-store.netlify.app/'}}).then(res => {
            const game = res.data
            setProduct(game)
        })
    }, [])

    let addToCart = () => {
        setClicked("Item added to cart!")
        let existing = localStorage.getItem("cart")
        existing = existing ? existing.split(",") : []
        existing.push(product[0].gameID)
        localStorage.setItem("cart", existing)
        
    }



    return (
        <div className="main-container">
            <Navbar />
            {
                product ? (
                    <div className="container shadow-lg">
                        <section className="productInfo d-md-flex ">
                            <img className="productImage" src={(product[0].src ? (product[0].src) : "./img/placeholder.jpg")} alt="" />
                            <div className="productDesc">
                                <h1><strong>{product[0].title}</strong></h1>
                                <p>{product[0].platform}</p>
                                <h4>${product[0].price}</h4>

                                <div className="selection my-5">
                                    
                                    <p className="text-muted">Category: {product[0].catname}</p>
                                    <p className="text-muted">Release Date: {product[0].year}</p>
                                    <hr />
                                    {clicked && <div className="bg-success text-white text-center my-2">{clicked}</div>}
                                    <button className="btn btn-primary mr-3" onClick={addToCart}>Buy now</button>
                                    <button className="btn btn-danger mx-3" onClick={e => addToCart()}><i className="fas fa-shopping-cart" /> Add to Cart</button>
                                </div>
                            </div>
                        </section>
                    
                        <div className="">
                            <ul className="nav panel-heading">
                                <li className="nav-item">
                                    <a href="#" className="nav-link" onClick={() =>{setPgState("description")}}>Description</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link" onClick={() => { setPgState("reviews") }}>Reviews</a>
                                </li>
                            </ul>
                            {
                                pageState == "description" ? (<p className="productDescription panel-body">{product[0].description}</p>) : <Reviews />
                            }
                        </div>
                        <hr/>
                        <h3>More Games</h3>
                        <Games />
                    </div>

                ) : <div><h2>"Loading..."</h2><div className="spinner-border"></div></div>


            }
        </div>
    )
}

export default Product
