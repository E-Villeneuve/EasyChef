import './SignUp.css';
import '../../components/globals.css';
import { useState } from 'react';
import { UserContext } from '../../App';
import { useContext } from 'react';
import { useEffect } from 'react';
import { SearchContext } from '../../App';
import AnimatePage from '../../components/AnimatePage';

function SignUp() {

    const { setSuggestions, setPageNum } = useContext(SearchContext);

    useEffect(() => {
        setSuggestions([]);
        setPageNum(1);
    }, [setSuggestions, setPageNum]);

    /*Value setting obtained primarily from 
    https://www.section.io/engineering-education/registration-form-react.js-firebase/#creating-a-registration-form */
    
    const { setEmail, setPassword, setFirstName, setLastName} = useContext(UserContext);
    
    let [email_error, setEmailError] = useState('');
    let [fname_error, setFNameError] = useState('');
    let [lname_error, setLNameError] = useState('');
    let [password_error, setPassError] = useState('');
    let [formEmail, setFormEmail] = useState('');
    let [formPassword, setFormPassword] = useState('');
    let [formFirstName, setFormFirstName] = useState('');
    let [lastFormName, setFormLastName] = useState('');
    let [account_status, setStatus] = useState('');

    let handleInput = (i) => {
        let {id, value} = i.target;
        if (id === "email") {

            setFormEmail(value);

            setEmailError("");
        }
        if (id === 'first_name') {
            setFormFirstName(value);
        }
        if (id === 'last_name') {
            setFormLastName(value);
        }
        if (id === "password") {
            setFormPassword(value);
        }
    }
    

    let submit = () => {

        const errEmpty = (vals, msgs, setters) => {
            setters.forEach(setter => setter('')); // Clear error msgs if not
            vals.forEach((val, index) => !val && setters[index](msgs[index]));
        }

        if (formEmail && formPassword && formFirstName && lastFormName) {
            setStatus("");
            let request = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ 'email': formEmail, 'password': formPassword, 'first_name': formFirstName, 'last_name': lastFormName})
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
                setEmail(formEmail);
                setFirstName(formFirstName);
                setLastName(lastFormName);
                setPassword(formPassword);
                setStatus("Account Succesfully Created!");
            }
            else {

                if (res.data.email) setEmailError(res.data.email[0]);
                if (res.data.first_name) setFNameError(res.data.first_name[0]);
                if (res.data.last_name) setLNameError(res.data.first_name[0]);
                if (res.data.password) setPassError(res.data.password[0]);

            }
            }))}
        else {
            errEmpty([formEmail, formPassword, formFirstName, lastFormName], 
                     ['Email cannot be empty', 'Password cannot be empty', 'First name cannot be empty', 'Last name cannot be empty'],
                     [setEmailError, setPassError, setFNameError, setLNameError]);
        }
}

    return (
        <AnimatePage>
        
        <div className="signup-container">
        <h1>{account_status}</h1>
        
    <div className={'card signup'}>
        <div className="card-header signup-header">Account Details</div>
        <div className="card-body">
            <form id="signup-form">
               
                <div className="mb-3">
                    <label className="small mb-1" for="email">Email</label>
                    <input className="form-control" id="email" required type="email" value={formEmail} onChange={(i) => handleInput(i)} placeholder="Enter your email" />
                    <label className="small mb-1 signup_error" for="email">{email_error}</label>
                </div>
                <div className="mb-3">
                    <label className="small mb-1" for="first_name">First Name</label>
                    <input className="form-control" id="first_name" required type="text" value={formFirstName} onChange={(i) => handleInput(i)} placeholder="Enter your first name" />
                    <label className="small mb-1 signup_error" for="first_name">{fname_error}</label>
                </div>
                <div className="mb-3">
                    <label className="small mb-1" for="last_name">Last Name</label>
                    <input className="form-control" id="last_name" required type="text" value={lastFormName} onChange={(i) => handleInput(i)} placeholder="Enter your last name" />
                    <label className="small mb-1 signup_error" for="last_name">{lname_error}</label>
                </div>
                <div className="mb-3">
                    <label className="small mb-1" for="password">Password</label>
                    <input className="form-control" id="password" required type="password" value={formPassword} onChange={(i) => handleInput(i)} placeholder="Enter your password" />
                    <label className="small mb-1 signup_error" for="password">{password_error}</label>
                </div>

                <button className="btn btn-primary btn-signup" id="register-button" type="button" onClick={()=>submit()}>Register</button>
            </form>
            <span>Already have an account? <a href="/login">Log in here!</a></span>
        </div>
        

    </div>
    

    </div>

    </AnimatePage>
    
    );
    }


export default SignUp;