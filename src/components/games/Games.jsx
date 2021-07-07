import { useEffect, useState } from 'react'
import axios from 'axios'
import GameCard from './gameCard/gameCard'



function Games(props) {
    const [games, setGames] = useState()

    useEffect(() => {
        axios.get("https://react-game-marketplace.herokuapp.com/games", { headers: {'Access-Control-Allow-Origin': 'http://bed-react-store.netlify.app/'}}).then(res => {
            const allGames = res.data
            setGames(allGames)
        })

    }, [])


    return (
        <div>
            {
                (games) ?
                    (props.filtered) ? 
                        <div className="">
                            {props.filtered.map(item => {
                                return(<GameCard game={item} />)
                            })}
                        </div> :
                        <div className="">{games.map(game => {
                            return (
                                <GameCard game={game} />
                            )
                        })}</div> : <div className="text-center"><h1>Loading...</h1><div className="spinner-border"></div></div>

            }
            

        </div>
    )
}

export default Games
