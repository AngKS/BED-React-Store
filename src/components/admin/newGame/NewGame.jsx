import React, { useEffect, useState } from 'react'
import Select from "react-select"
import { Link } from 'react-router-dom'
import axios from 'axios'
import NewCategory from '../newCategory/NewCategory'

function NewGame(props) {

    const [verified, setVerified] = useState(false)
    const [result, setResult] = useState()
    const [categories, setCategories] = useState([])
    const [regGameName, setRegGameName] = useState()
    const [regGameDesc, setRegGameDesc] = useState()
    const [regPrice, setRegPrice] = useState()
    const [regPlatform, setRegPlatform] = useState()
    const [selectedCat, setSelectedCat] = useState()
    const [regYear, setRegYear] = useState()

    let header = { 'authorization': 'Bearer ' + props.token }

    let submitGame = () => {
        console.log(regGameName, regGameDesc, regPrice, regPlatform, selectedCat, regYear);
        verified ?
            axios({
                method: "POST",
                url: "https://react-game-marketplace.herokuapp.com/game",
                headers: header,
                data: {
                    title: regGameName,
                    description: regGameDesc,
                    price: regPrice,
                    platform: regPlatform,
                    category: selectedCat,
                    year : regYear
                }
            }).then(res => {
                let response = res.data
                setResult(response.message)
            }).catch(err => setResult(err.response.data.message))
            :
            console.log("Please login again./");
    }

    let calcYears = () => {
        let currentYear = new Date().getFullYear()
        let minYear = currentYear - 5
        let yearArr = []
        for (let yr = minYear; yr <= currentYear; yr++) {
            yearArr.push({
                "label": yr
            })
        }
        return yearArr
    }

    useEffect(() => {
        let verification = async () => {
            await axios({
                method: "POST",
                url: "http://localhost:8081/verify",
                headers: header,
                data: JSON.parse(localStorage.getItem("user"))
            }).then(res => {
                let response = res.data
                setVerified(response.auth)

            })
        }

        let getCategories = async () => {
            await axios({
                method: "GET",
                url: "http://localhost:8081/categories",
                headers: header
            }).then(res => {
                let response = res.data
                const options = response.map(r => ({
                    "ID": r.catID,
                    "label": r.catname
                }))
                setCategories(options)
            })
        }

        verification()
        getCategories()
    }, [])

    return (
        <div className="p-5 container">
            <div className="">{result && result}</div>
            <h3>Add new Game:</h3>
            <hr />
            <form action="">
                <div className="form-group m-4">
                    <label htmlFor="title">Enter Game title:</label>
                    <input type="text" className="form-control" placeholder="e.g Final Fantasy XI, Growtopia" onChange={e => setRegGameName(e.target.value)} required />
                </div>
                <div className="form-group m-4">
                    <label htmlFor="description">Enter Game Description:</label>
                    <textarea className="form-control" rows="4" id="description" onChange={e => setRegGameDesc(e.target.value)} required></textarea>
                </div>

                <div className="form-group mx-4">
                    <label htmlFor="price">Enter Price:</label>
                    <div className="input-group">
                        <strong className=" align-items-center"><h3>$</h3></strong><input className="form-control w-25" type="number" onChange={e => setRegPrice(e.target.value)} required />
                    </div>
                </div>
                <div className="form-group mx-4">
                    <label htmlFor="year">Game Release Year:</label>
                    <Select id="year" options={calcYears()} onChange={e => setRegYear(e.label)}/>

                </div>

                <div className="form-group m-4">
                    <label htmlFor="platform">Select Game Platform:</label>
                    <select className="form-control" placeholder="Select one" id="" onChange={e => setRegPlatform(e.target.value)} required>
                        <option value="" selected disabled hidden>-- Choose here --</option>
                        <option value="PC">PC</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Console">Console</option>
                    </select>
                </div>
                <div className="form-group m-4">
                    <label htmlFor="category">Enter Game Category</label>
                    <Select options={categories} onChange={e => setSelectedCat(e.ID)} />
                </div>

                {verified ? <button className="btn btn-secondary m-4" onClick={submitGame}>Add new category</button> : <p>You are not verified. <Link to="/login" onClick={e => localStorage.clear()}>Login</Link></p>}
            </form>
            
        </div>
    )
}

export default NewGame
