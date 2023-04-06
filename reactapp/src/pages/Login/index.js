import './Login.css';
import '../../components/globals.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../App';
import { useState, setState } from 'react';
import nopic from '../../images/defaultavatar.png';

function Login() {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    let [email_error, setEmailError] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');


    let handleInput = (i) => {
        let {id, value} = i.target;
        if (id === "email") {

            setEmail(value);

        }
        if (id === "password") {
            setPassword(value);
        }
    }

    let submit = () => {
        if (email && password) {

        
        let request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ 'email': email, 'password': password})
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
            
            let request = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(res.data.access)},
            }
            
            setAuth(true); 
            fetch("http://127.0.0.1:8000/accounts/getinfo/", request)
            .then(response => response.json()
            .then(data => ({
                data: data,
            })
            ).then(res => {
                localStorage.setItem('id', res.data.id);
                localStorage.setItem('email', res.data.email);
                
                localStorage.setItem('first_name', res.data.first_name);
                localStorage.setItem('last_name', res.data.last_name);

                localStorage.setItem('password', password);

                if (res.data.description) {
                    localStorage.setItem('description', res.data.description);
                }
                else {
                    localStorage.setItem('description', '');
                }
                if (res.data.phone_number) {
                    localStorage.setItem('phone_number', res.data.phone_number);
                }
                else {
                    localStorage.setItem('phone_number', '');
                }
                if (res.data.avatar) {

                    localStorage.setItem('avatar', res.data.avatar);
                }
                else {
                    localStorage.setItem('avatar', nopic);
                }
                    
                
                
                
                
            }))

            navigate('/');
            /* Reloading page ensures that the navbar is up-to-date */
            window.location.reload();


        }
        }));

    }
}


    return (
        <>
        <div className="login-container">

    
    <div className={'card login'}>
        <div className="card-header">Account Details</div>
        <div className="card-body">
            <form id="login-form">

            <div className="mb-3">
                    <label className="small mb-1" for="Email">Email</label>
                    <input className="form-control" id="email" required type="email" value={email} onChange={(i) => handleInput(i)} placeholder="Enter your email" />
                    <label className="small mb-1" for="Email">{email_error}</label>
                </div>
                <div className="mb-3">
                    <label className="small mb-1" for="Password">Password</label>
                    <input className="form-control" id="password" required type="password" value={password} onChange={(i) => handleInput(i)} placeholder="Enter your password" />
                </div>

                <button className="btn btn-primary btn-login" id="button" type="button" onClick={()=>submit()}>Login</button>
            </form>
            <span>Don't have an account? <a href="/signup">Register here!</a></span>
        </div>
        

    </div>

    </div>

    </>
    
    );
    }


export default Login;