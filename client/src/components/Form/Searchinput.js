import React from 'react'
import { useSearch } from '../../context/search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Searchinput = () => {
   const navigate = useNavigate()
    const [values, setValues] = useSearch()

    const handleSubmit =async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.get(`/api/user/product/search/${values.keyword}`)
            setValues({...values, results: data});
            navigate("/search")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form className="d-flex" role="search">
                <input className="form-control me-2 mt-2" 
                type="search" 
                placeholder="Search" 
                aria-label="Search"
                value={values.keyword} 
                onChange={(e) => setValues({...values, keyword:e.target.value})}/>
                <button className="btn btn-outline-success mt-2" type="button" onClick={handleSubmit}>Search</button>
            </form>
        </div>
    )
}

export default Searchinput