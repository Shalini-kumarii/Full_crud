import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Link, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Details = (props) => {

    const [errors, setErrors] = useState({})
    const history = useHistory()
    const { id } = useParams()
    const [authors, setAuthers] = useState([])
    console.log("inside Details")
    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${id}`)
            .then(res => {
                console.log("inside get")
                console.log(res.data)
                setAuthers(res.data)
            }
            )
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
    }, []);
    //console.log(props.product.title);

    const CancelHandler = e => {

        e.preventDefault();
        history.push("/")

    }

    return (
        
        <div>

            <p> Name: {authors.name}</p>
            <p> quotes:{authors.quotes}</p>
            <p> Checked:{authors.isChecked}</p>
            <button className="btn btn-warning" onClick={CancelHandler}>Cancel</button>

            </div>
    );
};

export default Details;