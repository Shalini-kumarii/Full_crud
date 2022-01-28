import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Main = (props) => {


    const [authors, setAuthors] = useState([])
    const [load, setload] = useState(false)
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/authors")
            .then(res => {
                console.log(res.data)
                setAuthors(res.data)
                setload(true);
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

    const deleteAuthor = (deleteId) => {
        // console.log(deleteId);
        axios.delete("http://localhost:8000/api/authors/" + deleteId)
            .then(res => {
                console.log(res.data);
                console.log("SUCCESS DELETE!");

                // remove from DOM after delete success
                setAuthors(authors.filter((author) => author._id !== deleteId))
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


    return (
        <div >
            <h3>Favourite Authors!</h3>
            <h5>
                <Link to={"/author/create/"}>Add an Author </Link>
            </h5>
            <table className="table table-bordered ">
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Actions available</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        authors.map((author, idx) => {

                            return (
                                <tr key={author._id} >
                                    <td>
                                        {author.isChecked ? "true" : ""}
                                        {author.name}
                                    </td>
                                    <td>
                                        <Link className="btn btn-primary" to={"/author/update/" + author._id}>Edit </Link>
                                        <Link className="btn btn-primary"  to={"/author/show/" + author._id}>Show </Link>
                                        <button className="btn btn-danger" onClick={() => deleteAuthor(author._id)}>delete</button>
                                    </td>
                                </tr>
                            )

                        })
                    }
                </tbody>
            </table>

        </div>

    )
};

export default Main;





