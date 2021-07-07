import React from 'react'
import { Link } from 'react-router-dom'
import "./game.css"

function GameCard(props) {
    let setGame = () => {
        localStorage.setItem("game", props.game.gameID)
        window.location.reload(false)
    }

    return (
        <div className="d-inline-flex">
            <div className="card-container rounded ">
                <figure className="m-0 rounded">
                    <img className="cardImg img-fluid" src={(props.game.src) ? props.game.src : './img/placeholder.jpg'} alt="" />
                </figure>
                <Link to="/product" className="text-decoration-none" onClick={setGame}>
                    <body className="card-text text-center rounded">
                        <h5 className="p-2">{props.game.title}</h5>
                        <p className="info">${props.game.price}</p>
                        <Link to="/product"><button className="btn btn-primary m-2" >View more</button></Link>

                    </body>
                </Link>
            </div>
        </div >
    )
}

export default GameCard
