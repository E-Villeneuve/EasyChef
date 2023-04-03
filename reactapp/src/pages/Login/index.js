import './Login.css';
import '../../components/globals.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login() {
    return (
        <>
        <div className="container">

    
    <div className="card">
        <div className="card-header">Account Details</div>
        <div className="card-body">
            <form id="signup-form">

                <div className="mb-3">
                    <label className="small mb-1" for="wantedEmail">Email</label>
                    <input className="form-control" id="wantedEmail" required type="email" placeholder="Enter your email" />
                </div>
                <div className="mb-3">
                    <label className="small mb-1" for="wantedPassword">Password</label>
                    <input className="form-control" id="wantedPassword" required type="password" placeholder="Enter your password" />
                </div>

                <button className="btn btn-primary" id="register-button" type="button">Register</button>
            </form>
            <span>Don't have an account? <a href="/signup">Register here!</a></span>
        </div>
        

    </div>

    </div>

    </>
    
    );
    }


export default Login;