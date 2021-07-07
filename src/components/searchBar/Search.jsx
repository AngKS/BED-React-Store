import { React, useState, useEffect } from 'react'
import axios from "axios"
import "./search.css"
import Games from '../games/Games'


function Search(props) {

    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [games, setGames] = useState()
    const [filteredGames, setFilteredGames] = useState()

    useEffect(() => {
        let getGames = async () => {
            await axios.get("https://react-game-marketplace.herokuapp.com/games", { headers: {'Access-Control-Allow-Origin': 'http://bed-react-store.netlify.app/'}}).then(res => {
                let response = res.data
                setGames(response)
            })
        }
        getGames()

    }, [])

    useEffect(() => {
        query ? filtering() : setResults([])
    }, [query.length])

    let filtering = () => {
        // console.log(games)
        let filteredList = []
        games.filter(game => {
            console.log("HERRRR"  + query);
            if (
                game.title.toLowerCase().includes(query.toLowerCase()) || 
                game.platform.toLowerCase().includes(query.toLowerCase()) || 
                (game.price <= parseFloat(query)) ||
                (game.catname.toLowerCase().includes(query))
                ) {

                    filteredList.push(game)
            }


        })
        return setResults(filteredList)
    }


    let searchGame = (e) => {
        setQuery(e.target.value)

    }

    return (
        <div className="d-flex homeSearch m-auto">
            <div>
                <div className="">
                    <input className="m-3" className="form-control" type="text" placeholder="Enter a game" onChange={e => searchGame(e)} />
                </div>
                {
                    games ? (
                        <div>
                            {
                                (results.length > 0) ? (
                                    <>
                                        <h6 className="p-3">Results for: "<strong>{query}</strong>"</h6>
                                        <Games filtered={results} />
                                    </>
                                ) : <Games filter={games} />
                            }
                        </div>
                
                
                    ) : <h1>Loading</h1>
                }
            </div>

        </div>
    )
}

export default Search
