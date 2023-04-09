import './EditProfile.css';
import '../../../components/globals.css';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { UserContext } from '../../../App';
import { useState, setState } from 'react';


function EditProfileSignedIn() {

    const {
            setFirstName,
            setLastName,
            setDescription,
            setPhoneNum,
            setEmail,
            setPassword,
            } = useContext(UserContext);

    let [formEmail, setFormEmail] = useState(localStorage.getItem('email'));
    let [formPassword, setFormPassword] = useState('');
    let [newPassword, setNewPassword] = useState('');
    let [confirmPass, setConfirmPassword] = useState('');
    let [formFirstName, setFormFirstName] = useState(localStorage.getItem('first_name'));
    let [formLastName, setFormLastName] = useState(localStorage.getItem('last_name'));
    let [formDescription, setFormDescription] = useState(localStorage.getItem('description'));
    let [formPhoneNum, setFormPhoneNum] = useState(localStorage.getItem('phone_number'));
    let [avatar, setAvatar] = useState(localStorage.getItem('avatar'));

    let handleInput = (i) => {
        let {id, value} = i.target;
        
        if (id === "inputEmailAddress") {
            setFormEmail(value);
        }
        if (id === "oldPass") {
            
            setFormPassword(value);
        }
        if (id === 'inputFirstName') {
            setFormFirstName(value);

        }
        if (id === 'inputLastName') {
            setFormLastName(value);
        }
        if (id === 'biography') {
            setFormDescription(value);
            
        }
        if (id === 'inputPhone') {
            setFormPhoneNum(value);
        }
        if (id === 'newPass') {
            setNewPassword(value);
        }
        if (id === 'confirmPass') {
            setConfirmPassword(value);
        }

    }

    let submitDetails = () => {
        let request = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(localStorage.getItem('access'))},
            body: JSON.stringify({ 'email': formEmail, 'first_name': formFirstName, 'last_name': formLastName, 'description': formDescription, 'phone_number': formPhoneNum})
        }
        fetch('http://127.0.0.1:8000/accounts/editprofile/' + String(localStorage.getItem('id')) + '/', request)
        .then(response => response.json()
        .then(data => ({
            data: data,
            response: response
        })
        ).then(res => { // HEY, ENSURE YOU GET AN OK RESPONSE BEFORE SETTING THINGS MAN
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('first_name', res.data.first_name);
            localStorage.setItem('last_name', res.data.last_name);    
               
            if (res.data.description) {
                localStorage.setItem('description', res.data.description);
            }
            else {
                localStorage.setItem('description', '');
            }
            if (res.data.phone_number) { // See https://stackoverflow.com/questions/65734087/how-to-test-phonenumber-field-modelfields-phonenumberfield
                                        // For valid and invalid phone nums (basically, user must input their country code + phone_num)
                localStorage.setItem('phone_number', res.data.phone_number);
            }
            else {
                    localStorage.setItem('phone_number', '');
            }

            setEmail(res.data.email);
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
            setDescription(res.data.description);
            setPhoneNum(res.data.phone_number);
        }));
    }

    // avatar stuff i didn't touch
    //////////////////
    let uploadPic = () => {
        document.getElementById('selectedFile').click();
        console.log(avatar);
    }

    let submitPic = () => {

        if (document.getElementById('selectedFile').value) {
            
            
            let formdata = new FormData();
            formdata.append('avatar', document.getElementById('selectedFile').files[0]);

            
            let request = {
                method: 'PATCH',
                headers: {'Authorization': 'Bearer ' + String(localStorage.getItem('access'))},
                body: formdata
            }
            fetch('http://127.0.0.1:8000/accounts/editprofile/' + String(localStorage.getItem('id')) + '/', request)
            .then(response => response.json()
            .then(data => ({
                data: data,
                response: response
            })
            ).then(res => {
                console.log(res.data.avatar);
                setAvatar(res.data.avatar);
                localStorage.setItem('avatar', res.data.avatar);
            }));
            
                
            
            
        }
        
    }
    /////////////////////////////

    let submitPass = () => {
        console.log(formPassword);
        console.log(localStorage.getItem('password'));
        if (formPassword === localStorage.getItem('password') && newPassword === confirmPass && newPassword !== '') {
            let request = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(localStorage.getItem('access'))},
                body: JSON.stringify({'formPassword': newPassword})
            }
            fetch('http://127.0.0.1:8000/accounts/editprofile/' + String(localStorage.getItem('id')) + '/', request)
        .then(response => response.json()
        .then(data => ({
            data: data,
            response: response
        })
        ).then(res => {
            localStorage.setItem('password', newPassword);
            setPassword(newPassword);
        }));

        
        }
    }
            
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
                                
                                <img className="img-account-profile rounded-circle mb-2" src={avatar} alt=""/>
                               
                                <div className="small font-italic text-muted mb-4">Current Profile Picture</div>
                                {/*Button Based off https://stackoverflow.com/a/14806776 */}
                                <input type="file" id="selectedFile" onChange={()=>submitPic()} accept='image/*'/>
                                <button className="btn btn-profile" onClick={()=>uploadPic()}>Upload new image</button>
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
                                            <input className="form-control" id="inputFirstName" type="text" value={formFirstName} onChange={(i) => handleInput(i)} placeholder="Enter your first name" />
                                        </div>
        
                                        <div className="col">
                                            <label className="small mb-1" for="inputLastName">Last name</label>
                                            <input className="form-control" id="inputLastName" type="text" value={formLastName} onChange={(i) => handleInput(i)} placeholder="Enter your last name"/>
                                        </div>
                                    </div>
        
                                    <div className="row mb-3">
        
                                        <div className="col">
                                            <label className="small mb-1" for="inputEmailAddress">Email Address</label>
        
                                            <input className="form-control" id="inputEmailAddress" type="email" value={formEmail} onChange={(i) => handleInput(i)} placeholder="Enter your Email address"/>
                                        </div>
        
                                        <div className="col">
                                            <label className="small mb-1" for="inputPhone">Phone number</label>
                                            <input className="form-control" id="inputPhone" onChange={(i) => handleInput(i)} value={formPhoneNum} type="tel" placeholder="Enter your phone number"/>
                                        </div>
                                    </div>
                                    
                                    
                                    <div className="mb-3">
                                        <label className="small mb-1" for="feedback">Bio</label>
                                        <textarea className="form-control" rows="8" cols="80" name="biography" id="biography" value={formDescription} onChange={(i) => handleInput(i)} placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"></textarea>
                                        
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
                            <input className="form-control" id="oldPass" onChange={(i) => handleInput(i)} type="password" value={formPassword} placeholder="Enter your password"/>
                        </div>
        
                        <div className="mb-3">
                          <label className="small mb-1" for="newPass">New Password</label>
                          <input className="form-control" id="newPass" onChange={(i) => handleInput(i)} type="password" value={newPassword} placeholder="Enter your new password"/>
                        </div>
        
                        <div className="mb-3">
                          <label className="small mb-1" for="confirmPass">Confirm New Password</label>
                          <input className="form-control" id="confirmPass" onChange={(i) => handleInput(i)} type="password" value={confirmPass} placeholder="Confirm your new password"/>
                        </div>
                        <button className="btn btn-profile" id="save-password-button" onClick={()=>submitPass()} type="button">Change Password</button>
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
