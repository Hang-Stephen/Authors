import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const DisplayAuthor = (props) => {
    const [authorList, setAuthorList] = useState([]);


    useEffect (() => {
        axios.get("http://localhost:8000/api/authors")
        .then((res) => setAuthorList(res.data))
        .catch((err) => console.log(err));
}, [])

    const handleDelete = (authorId) => {
        axios.delete(`http://localhost:8000/api/authors/${authorId}`)
        .then((res) => {
            console.log("Successfully deleted author");
            console.log(res);
            const filterAuthor = authorList.filter((author) => {
                return author._id !== authorId;
            });
            setAuthorList(filterAuthor);
        })
        .catch((err) => {
            console.log("failed to delete author", err.response);
        })
    }

    return (
        <div>
            <h1>Favorite authors</h1>
            <Link to = {'authors/new'} class = "new">Add an author</Link>
            <p>We have quotes by:</p>
            <table className = "author-list">
                <tr>
                    <th>Name</th>
                    <th>Actions available</th>
                </tr>
                <tr>

                </tr>
                {
                    authorList.map((author, index) => (
                        <tr key ={index}>
                            <td>{author.name}</td>
                            <td>
                                <Link to = {`/authors/edit/${author._id}`} class = "edit"> Edit</Link> 
                                <button onClick = {() => handleDelete(author._id)} class = "delete">Delete</button>
                            </td>

                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default DisplayAuthor;