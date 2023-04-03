import './Login.css';
import '../../components/globals.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../App';

const Login = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    let submit = () => { 
        let request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ 'email': 'test2@testing.com', 'password': 'test2'}) // temporary
        }
        /* Response Body obtained from promise via https://stackoverflow.com/a/37555432 */
        fetch("http://127.0.0.1:8000/accounts/login/", request)
        .then(response => response.json()
        .then(data => ({
            data: data,
            response: response
        })
        ).then(res => {
        if (res.response.ok) {
            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
            setAuth(true);
            navigate('/');

        }
        }));

    }


    return (
        <>
        <div className="container">

    
    <div className="card">
        <div className="card-header">Account Details</div>
        <div className="card-body">
            <form id="signup-form">

            <div className="mb-3">
                    <label className="small mb-1" for="Email">Email</label>
                    <input className="form-control" id="email" required type="email" value={email} onChange={(i) => handleInput(i)} placeholder="Enter your email" />
                    <label className="small mb-1" for="Email">{email_error}</label>
                </div>
                <div className="mb-3">
                    <label className="small mb-1" for="Password">Password</label>
                    <input className="form-control" id="password" required type="password" value={password} onChange={(i) => handleInput(i)} placeholder="Enter your password" />
                </div>

                <button className="btn btn-primary" id="register-button" type="button" onClick={()=>submit()}>Register</button>
            </form>
            <span>Don't have an account? <a href="/signup">Register here!</a></span>
        </div>
        

    </div>

    </div>

    </>
    
    );
    }


export default Login;