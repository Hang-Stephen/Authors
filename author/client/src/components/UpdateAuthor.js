import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';

const UpdateAuthor = (props) => {
    const {id} = useParams();
    const [name, setName] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/authors/" + id)
        .then(res => {
            setName(res.data.name);
        })
        .catch(err => console.log(err))
    }, [id])

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http:localhost:8000/api/authors/edit/${id}`, {
            name
        })
        .then((res) => {
            console.log(res);
            console.log(res.data);
            navigate("/");
        })
        .catch((err) => {
            console.log(err)
            const errorResponse = err.response.data.error.errors;
                const errorArray = []
    
                for (const key of Object.keys(errorResponse)) {
                    errorArray.push(errorResponse[key].message)
                }
    
                setErrors(errorArray);
        })
    }

    return (
        <div>
            <h1>Favorite authors</h1>
            <Link to = {'/'} className = "home">Home</Link>
            <p>Edit this author</p>
            <form class = "form" onSubmit = {submitHandler}>
                {errors.map((err, index) => <p className = "errors" key = {index}>{err}</p>)}
                <label>Name:</label><br></br>
                <input type = "text" value = {name} onChange = {(e) => setName(e.target.value)}/>
                <div class = "bot-bar">
                    <Link to = {'/'} class = "cancel">Cancel</Link>
                    <input type = "submit" class = "submit" value = "Submit"/>
                </div>
            </form>
        </div>
    )
    
}

export default UpdateAuthor;