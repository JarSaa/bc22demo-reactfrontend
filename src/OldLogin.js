import React, { useState } from 'react';
import axios from "axios";
import apiURL from './myURL';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        setIsError(false);
        window.localStorage.clear();
        axios.post(apiURL + '/login', {username,password}, {
        })
            .then(res => {
                setUsername('');
                setPassword('');
                setLoading(false);
                console.log(res.data);
                if(res.data){
                    localStorage.setItem('token',res.data);
                }
            }).catch(err => {
                setLoading(false);
                setIsError(true);
            });
    }

    return (
        <div className="container">
            <div style={{ maxWidth: 350 }}>
                <label htmlFor="username">username </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)} />
                <br />
                <label htmlFor="password">password </label>
                <input
                    type="text"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
                <br />
                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                >Login</button>
                {isError && <small>Something went wrong. Please try again later.</small>}
            </div>
        </div>
    );
}

export default Login;