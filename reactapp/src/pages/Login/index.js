import './Login.css';
import '../../components/globals.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useState, setState } from 'react';
import nopic from '../../images/defaultavatar.png';

function Login() {
    const navigate = useNavigate();
    const { setAuth, 
            setLoading,
            setFirstName,
            setLastName,
            setDescription,
            setPhoneNum,
            setAvatar,
            setEmail,
            setPassword,
            } = useContext(UserContext);

    let [email_error, setEmailError] = useState('');
    let [formEmail, setFormEmail] = useState('');
    let [formPassword, setFormPassword] = useState('');


    let handleInput = (i) => {
        let {id, value} = i.target;
        if (id === "email") {

            setFormEmail(value);

        }
        if (id === "password") {
            setFormPassword(value);
        }
    }

    let submit = () => {
        setLoading(true);
        if (formEmail && formPassword) {
        let request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ 'email': formEmail, 'password': formPassword})
        }
        /* Response Body obtained from promise via https://stackoverflow.com/a/37555432 */
        fetch("http://127.0.0.1:8000/accounts/login/", request)
        .then(response => response.json()
        .then(data => ({
            data: data,
            response: response
        })
        ).then(async res => {
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

                localStorage.setItem('password', formPassword);

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
                
                setEmail(res.data.email);
                setFirstName(res.data.first_name);
                setLastName(res.data.last_name);
                setPassword(formPassword);
                setDescription(res.data.description);
                setPhoneNum(res.data.phone_number);
                setAvatar(res.data.avatar ? res.data.avatar : nopic);  
                
                
            }))
            setLoading(false);
            navigate('/');

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
                    <input className="form-control" id="email" required type="email" value={formEmail} onChange={(i) => handleInput(i)} placeholder="Enter your email" />
                    <label className="small mb-1" for="Email">{email_error}</label>
                </div>
                <div className="mb-3">
                    <label className="small mb-1" for="Password">Password</label>
                    <input className="form-control" id="password" required type="password" value={formPassword} onChange={(i) => handleInput(i)} placeholder="Enter your password" />
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