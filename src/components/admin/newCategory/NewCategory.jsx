import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function NewCategory(props) {

    const [regCategory, setRegCategory] = useState()
    const [regCategoryDesc, setRegCategoryDesc] = useState()
    const [verified, setVerified] = useState(false)
    const [result, setResult] = useState()

    let header = { 'authorization': 'Bearer ' + props.token, 'Access-Control-Allow-Origin': 'http://bed-react-store.netlify.app/' }

    

    let submitCategory = () =>{
        verified ? 
            axios({
                method : "POST",
                url: "https://react-game-marketplace.herokuapp.com/category",
                headers : header,
                data : {
                    catname : regCategory,
                    description : regCategoryDesc
                }
            }).then(res => {
                let response = res.data
                setResult(response.message).catch(err => setResult(err.response.data.message))
            }) : console.log('Re-Login')
            
    }

    useEffect(() => {
        let verification = async () => {
            await axios({
                method : "POST",
                url: "https://react-game-marketplace.herokuapp.com/verify",
                headers : header,
                data : JSON.parse(localStorage.getItem("user"))
            }).then(res => {
                let response = res.data
                setVerified(response.auth)
                
            })
        }
        verification()
    }, [])


    return (
        <div className="container shadow-md rounded">
            <div className="">{result && result}</div>
            <h3>Add new Category</h3>
            <hr/>
            {result && <p>{result}</p>}
            <form action="">
                <div className="form-group">
                    <label htmlFor="category">Enter new Category Name:</label>
                    <input type="text" className="form-control" placeholder="e.g. Adventure, Action" onChange={e => setRegCategory(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Enter Category Description:</label>
                    <textarea className="form-control" rows="3" id="description" onChange={e => setRegCategoryDesc(e.target.value)} required></textarea>
                </div>
                {verified ? <button className="btn btn-secondary my-2" onClick={submitCategory}>Add new category</button>: <p>You are not verified. <Link to="/login" onClick={e =>localStorage.clear()}>Login</Link></p>}
            </form>
            
            
        </div>
    )
}

export default NewCategory
