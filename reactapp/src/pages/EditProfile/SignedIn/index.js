import './EditProfile.css';
import '../../../components/globals.css';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../../App';
import { useState, setState } from 'react';



function EditProfileSignedIn() {
    let [email, setEmail] = useState(localStorage.getItem('email'));
    let [password, setPassword] = useState('');
    let [first_name, setFirstName] = useState(localStorage.getItem('first_name'));
    let [last_name, setLastName] = useState(localStorage.getItem('last_name'));
    let [description, setDescription] = useState(localStorage.getItem('description'));
    let [phone_number, setNumber] = useState(localStorage.getItem('phone_number'));

    let handleInput = (i) => {
        let {id, value} = i.target;
        if (id === "inputEmailAddress") {
            setEmail(value);
        }
        if (id === "password") {
            setPassword(value);
        }
        if (id === 'inputFirstName') {
            setFirstName(value);

        }
        if (id === 'inputLastName') {
            setLastName(value);
        }
        if (id === 'biography') {
            setDescription(value);
            
        }
        if (id === 'inputPhone') {
            setNumber(value);
        }

    }

    let submitDetails = () => {
        let request = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(localStorage.getItem('access'))},
            body: JSON.stringify({ 'email': email, 'first_name': first_name, 'last_name': last_name, 'description': description, 'phone_number': phone_number})
        }
        fetch('http://127.0.0.1:8000/accounts/editprofile/' + String(localStorage.getItem('id')) + '/', request)
        .then(response => response.json()
        .then(data => ({
            data: data,
            response: response
        })
        ).then(res => {
            localStorage.setItem('email', res.data.email); // Lanz note: add option to avatar pic too pls + password change
                if (res.data.first_name) {
                    localStorage.setItem('first_name', res.data.first_name);
                }
                else {
                    localStorage.setItem('first_name', '');
                }
                if (res.data.last_name) {
                    localStorage.setItem('last_name', res.data.last_name);
                }
                else {
                    localStorage.setItem('last_name', '');
                }
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
        }));
    }

    

        
    /*
    let request = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(localStorage.getItem('access'))},
    }
    fetch("http://127.0.0.1:8000/accounts/getinfo/", request)
        .then(response => response.json()
        .then(data => ({
            data: data,
        })
        ).then(res => {
            setID(res.data.id);
            setEmail(res.data.email);
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
            setDescription(res.data.description);
            setNumber(res.data.phone_number);
        }));
    */
        
            
            
            return (
                <>
                
                <div className="container" id="page-body">
                <h2>Edit Profile</h2>
                <hr className="mt-0 mb-4"/>
                <div className="row" id="profilegrid">
                    <div className="col">
                        
                        <div className=" editprofile card" id="profilecard">
                            <div className="editprofile card-header">Profile Picture</div>
                            <div className="editprofile card-body text-center">
                                
                                <img className="img-account-profile rounded-circle mb-2" src="https://static.tvtropes.org/pmwiki/pub/images/auguste_gusteau.jpg" alt=""/>
                               
                                <div className="small font-italic text-muted mb-4">Current Profile Picture</div>
                                
                                <button className="btn btn-profile" type="button">Upload new image</button>
                            </div>
                        </div>
                    </div>
                    <div className="col grid-row-span-2">
                        
                        <div className="editprofile card mb-4">
                            <div className="editprofile card-header">Account Details</div>
                            <div className="editprofile card-body">
                                <form id="profile-form">
                                   
                                   
        
                                    <div className="row mb-3">
        
                                        <div className="col">
                                            <label className="small mb-1" for="inputFirstName">First name</label>
                                            <input className="form-control" id="inputFirstName" type="text" value={first_name} onChange={(i) => handleInput(i)} placeholder="Enter your first name" />
                                        </div>
        
                                        <div className="col">
                                            <label className="small mb-1" for="inputLastName">Last name</label>
                                            <input className="form-control" id="inputLastName" type="text" value={last_name} onChange={(i) => handleInput(i)} placeholder="Enter your last name"/>
                                        </div>
                                    </div>
        
                                    <div className="row mb-3">
        
                                        <div className="col">
                                            <label className="small mb-1" for="inputEmailAddress">Email Address</label>
        
                                            <input className="form-control" id="inputEmailAddress" type="email" value={email} onChange={(i) => handleInput(i)} placeholder="Enter your email address"/>
                                        </div>
        
                                        <div className="col">
                                            <label className="small mb-1" for="inputPhone">Phone number</label>
                                            <input className="form-control" id="inputPhone" onChange={(i) => handleInput(i)} value={phone_number} type="tel" placeholder="Enter your phone number"/>
                                        </div>
                                    </div>
                                    
                                    
                                    <div className="mb-3">
                                        <label className="small mb-1" for="feedback">Bio</label>
                                        <textarea className="form-control" rows="8" cols="80" name="biography" id="biography" value={description} onChange={(i) => handleInput(i)} placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"></textarea>
                                        
                                    </div>
                                    
                                    
                                    
                                    <button className="btn btn-profile" id="save-profile-button" onClick={()=>submitDetails()} type="button">Save changes</button>
                                </form>
                            </div>
        
                        </div>
                  </div>
        
                  <div className="col" id="password-card">
                    
                    <div className="editprofile card mb-4">
                        <div className="editprofile card-header">Password</div>
                        <div className="editprofile card-body">
                        <form id="password-form">
                        <div className="mb-3">
                            <label className="small mb-1" for="oldPass">Old Password</label>
                            <input className="form-control" id="oldPass" type="password" placeholder="Enter your password"/>
                        </div>
        
                        <div className="mb-3">
                          <label className="small mb-1" for="newPass">New Password</label>
                          <input className="form-control" id="newPass" type="password" placeholder="Enter your new password"/>
                        </div>
        
                        <div className="mb-3">
                          <label className="small mb-1" for="confirmPass">Confirm New Password</label>
                          <input className="form-control" id="confirmPass" type="password" placeholder="Confirm your new password"/>
                        </div>
                        <button className="btn btn-profile" id="save-password-button" type="button">Change Password</button>
                        </form>
        
                        </div>
                    </div>
                </div>
        
              </div>
        
        
              </div>
        
              
                </>
            )
    
}

export default EditProfileSignedIn;
