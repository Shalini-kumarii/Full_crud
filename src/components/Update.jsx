import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';

const Update = (props) => {
    const [authors, setAuthors] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [name, setName] = useState("");
    const [quotes, setQuotes] = useState("");
    const [isChecked, setIsChecked]  = useState(false);
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const { id } = useParams();
    console.log("inside update");

    useEffect(() => {
        axios.get("http://localhost:8000/api/authors/" + id)
            .then(res => {
                setAuthors(res.data);
                console.log(res.data);

                setLoaded(true);
            })
            .catch(err => console.log(err))
    }, [])

    const update = (e) => {
        e.preventDefault();

        const newAuthor = {
            name: name,
            quotes: quotes,
            isChecked:isChecked

        }

        // POST to the db, with the obj created
        axios.put("http://localhost:8000/api/authors/" + id, newAuthor)
            .then(res => {
                console.log(res.data);
                console.log("SUCCESS writing to the DB!!");
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
            <Link to="/">home</Link>
            {loaded ?
                <form className="form-horizontal" onSubmit={update}>
                    <div>

                        {errors.map((err, index) => <p style={{ color: "red" }} key={index}>{err}</p>)}
                        <div className="form-group form-group-lg">
                        <label class="col-sm-2 control-label" for="lg">Name:</label>
                        <div className="col-sm-10"> 
                            <input className="form-control" type="text" id="lg" onChange={(e) => setName(e.target.value)} value={name} placeholder={authors.name} />
</div>
                        </div>
                        <div className="form-group col-sm-20">
                            Quotes:
                            {/*<input type="text" onChange={(e) => setQuotes(e.target.value)} value={quotes} placeholder={authors.Author.quotes} />*/}
                            <select onChange={(e) => setQuotes(e.target.value)} value={quotes} placeholder={authors.quotes}>
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
                : <p>loading</p>
            }
        </div>
    );
}

export default Update;


