import './SignUp.css';
import '../../components/globals.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, setState } from 'react';

function SignUp() {
    /*Value setting obtained primarily from 
    https://www.section.io/engineering-education/registration-form-react.js-firebase/#creating-a-registration-form */
    let [email_error, setEmailError] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [account_status, setStatus] = useState('');

    let handleInput = (i) => {
        let {id, value} = i.target;
        if (id === "email") {

            setEmail(value);

            setEmailError("");
        }
        if (id === "password") {
            setPassword(value);
        }
    }
    

    let submit = () => {
        if (email && password) {
            setStatus("");
            let request = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ 'email': email, 'password': password})
            }
            /* Response Body obtained from promise via https://stackoverflow.com/a/37555432 */
            fetch("http://127.0.0.1:8000/accounts/signup/", request)
            .then(response => response.json()
            .then(data => ({
                data: data,
                response: response
            })
            ).then(res => {
            if (res.response.ok) {
                setStatus("Account Succesfully Created!");
            }
            else {
                setEmailError(res.data.email[0]);
            }
            }));

        }
    }

    return (
        <>
        
        <div className="signup-container">
        <h1>{account_status}</h1>
        
    <div className={'card signup'}>
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

                <button className="btn btn-primary btn-signup" id="register-button" type="button" onClick={()=>submit()}>Register</button>
            </form>
            <span>Already have an account? <a href="/login">Log in here!</a></span>
        </div>
        

    </div>
    

    </div>

    </>
    
    );
    }


export default SignUp;