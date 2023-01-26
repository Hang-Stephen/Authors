import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';

const AuthorForm = (props) => {
    const [name, setName] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/authors/new", {
            name
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            navigate("/");
        })
        .catch((err) => {
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
            <p>Add a new author:</p>
            <form class = "form" onSubmit = {submitHandler}>
                {errors.map((err, index) => <p className = "errors" key = {index}>{err}</p>)}
                <label>Name:</label><br></br>
                <input type = "text" onChange = {(e) => setName(e.target.value)}/>
                <div class = "bot-bar">
                    <Link to = {'/'} class = "cancel">Cancel</Link >
                    <input type = "submit" class = "submit" value = "Submit"/>
                </div>
            </form>
        </div>
    )
}

export default AuthorForm;