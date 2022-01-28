import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';

const Create = (props) => {
    const [name, setName] = useState("");
    const [quotes, setQuotes] = useState("person");

    const [errors, setErrors] = useState([]);
    const [isChecked, setIsChecked]  = useState(false);
    const history = useHistory();


    const onSubmitHandler = e => {

        e.preventDefault();  //prevent default behavior of the submit

        //make a post request to create a new 
        const newAuthor = {
            name: name,
            quotes: quotes,
            isChecked:isChecked
        }
        axios.post('http://localhost:8000/api/authors', newAuthor)
            .then(res => {
                console.log(res.data);
                history.push("/")
            })
            .catch(err => {
                console.log("ERROR!!!");
                console.log(err.response.data);
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = [];       // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    }

    const CancelHandler = e => {

        e.preventDefault();
        history.push("/")

    }


    return (
        <div className="container">
            <h3>Favourite Authors!</h3>
            <Link to="/">home</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <form onSubmit={onSubmitHandler}>
                <div>

                    {errors.map((err, index) => <p style={{ color: "red" }} key={index}>{err}</p>)}
                    <div className="form-group">
                        <label>Name</label><br />
                        <input type="text" className="form-control"  onChange={(e) => setName(e.target.value)} value={name} />

                    </div>
                    <div className="form-group" >
                        <label>Quotes</label>
                   { /*<input type="text" className="form-control" onChange={(e) => setQuotes(e.target.value)} value={quotes} />*/}
                   <select onChange={(e) => setQuotes(e.target.value)} value={quotes}>
                    <option value='quotes'>People</option>
                    <option value='planets'>Planets</option>
                </select>
                    </div>
                    <div>
                    <input type="checkbox" onChange={e => setIsChecked(e.target.checked)} checked={isChecked}/> checked? 
                    </div>
                    <button className="btn btn-primary">Submit</button>

                    <button className="btn btn-warning" onClick={CancelHandler}>Cancel</button>


                </div>


            </form>

        </div>
    )
}

export default Create;


