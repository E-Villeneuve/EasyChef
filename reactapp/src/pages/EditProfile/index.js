import './EditProfile.css';
import '../../components/globals.css';
import { useContext, useEffect } from 'react';
import { SearchContext, UserContext } from '../../App';
import { useState } from 'react';
import AnimatePage from '../../components/AnimatePage';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function EditProfile() {

    const email_ph = "Enter your email address";
    const first_ph = "Enter your first name";
    const last_ph = "Enter your last name";
    const pn_ph = "Eg. +5555555555";
    const desc_ph = "Tell us about yourself!"
    const old_pass_ph = "Enter your password";
    const new_pass_ph = "Enter your new password";
    const conf_pass_ph = "Confirm your new password";



    const { setSuggestions, setPageNum } = useContext(SearchContext);
    const location = useLocation();
    useEffect(() => {
        setSuggestions([]);
        setPageNum(1);
    }, [setSuggestions, setPageNum])

    const {
            setFirstName,
            setLastName,
            setDescription,
            setPhoneNum,
            setEmail,
            setPassword,
            } = useContext(UserContext);
    let [detailsButton, setDetails] = useState("Save changes");
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
            setDetails("Save Changes");
        }
        if (id === "oldPass") {
            
            setFormPassword(value);
        }
        if (id === 'inputFirstName') {
            setFormFirstName(value);
            setDetails("Save Changes");

        }
        if (id === 'inputLastName') {
            setFormLastName(value);
            setDetails("Save Changes");
        }
        if (id === 'biography') {
            setFormDescription(value);
            setDetails("Save Changes");
            
        }
        if (id === 'inputPhone') {
            setFormPhoneNum(value);
            setDetails("Save Changes");
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
        ).then(res => {
            if (res.response.ok) {
                localStorage.setItem('email', res.data.email);
            localStorage.setItem('first_name', res.data.first_name);
            localStorage.setItem('last_name', res.data.last_name);    
               
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
            setDetails("Success!");
            }
            else {
                setDetails("Failure");
            }

            setEmail(res.data.email);
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
            setDescription(res.data.description);
            setPhoneNum(res.data.phone_number);
            
        }));
    }

    let uploadPic = () => {
        document.getElementById('selectedFile').click();

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

                localStorage.setItem('avatar', res.data.avatar);
                setAvatar(res.data.avatar);
            }));

            
        }
        
    }

    let submitPass = () => {
        
        if (formPassword === localStorage.getItem('password') && newPassword === confirmPass && newPassword !== '') {
            let request = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(localStorage.getItem('access'))},
                body: JSON.stringify({'password': newPassword})
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
            
            return ( localStorage.getItem('access') ?
                (<AnimatePage>
                
                <div className="container" id="page-body">
                <h2>Edit Profile</h2>
                <hr className="mt-0 mb-4"/>
                <div className="row" id="profilegrid">
                    <div className="col">
                        
                        <div className=" editprofile card" id="profilecard">
                            <div className="editprofile card-header edit-header">Profile Picture</div>
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
                            <div className="editprofile card-header edit-header">Account Details</div>
                            <div className="editprofile card-body">
                                <form id="profile-form">
                                   
                                   
        
                                    <div className="row mb-3">
        
                                        <div className="col">
                                            <label className="small mb-1 details-box" for="inputFirstName">First name</label>
                                            <input className="form-control profile-field" id="inputFirstName" type="text" value={formFirstName} onChange={(i) => handleInput(i)} placeholder={first_ph} />
                                        </div>
        
                                        <div className="col">
                                            <label className="small mb-1 details-box" for="inputLastName">Last name</label>
                                            <input className="form-control profile-field" id="inputLastName" type="text" value={formLastName} onChange={(i) => handleInput(i)} placeholder={last_ph}/>
                                        </div>
                                    </div>
        
                                    <div className="row mb-3">
        
                                        <div className="col">
                                            <label className="small mb-1 details-box" for="inputEmailAddress">Email Address</label>
        
                                            <input className="form-control profile-field" id="inputEmailAddress" type="email" value={formEmail} onChange={(i) => handleInput(i)} placeholder={email_ph}/>
                                        </div>
        
                                        <div className="col">
                                            <label className="small mb-1 details-box" for="inputPhone">Phone number</label>
                                            <input className="form-control profile-field" id="inputPhone" onChange={(i) => handleInput(i)} value={formPhoneNum} type="tel" placeholder={pn_ph}/>
                                        </div>
                                    </div>
                                    
                                    
                                    <div className="mb-3">
                                        <label className="small mb-1 details-box" for="feedback">Bio</label>
                                        <textarea className="form-control profile-field" rows="8" cols="80" name="biography" id="biography" value={formDescription} onChange={(i) => handleInput(i)} placeholder={desc_ph}></textarea>
                                        
                                    </div>
                                    
                                    
                                    
                                    <button className="btn btn-profile" id="save-profile-button" onClick={()=>submitDetails()} type="button">{detailsButton}</button>
                                </form>
                            </div>
        
                        </div>
                  </div>
        
                  <div className="col" id="password-card">
                    
                    <div className="editprofile card mb-4">
                        <div className="editprofile card-header edit-header">Password</div>
                        <div className="editprofile card-body">
                        <form id="password-form">
                        <div className="mb-3">
                            <label className="small mb-1" for="oldPass">Old Password</label>
                            <input className="form-control profile-field" id="oldPass" onChange={(i) => handleInput(i)} type="password" value={formPassword} placeholder={old_pass_ph}/>
                        </div>
        
                        <div className="mb-3">
                          <label className="small mb-1" for="newPass">New Password</label>
                          <input className="form-control profile-field" id="newPass" onChange={(i) => handleInput(i)} type="password" value={newPassword} placeholder={new_pass_ph}/>
                        </div>
        
                        <div className="mb-3">
                          <label className="small mb-1" for="confirmPass">Confirm New Password</label>
                          <input className="form-control profile-field" id="confirmPass" onChange={(i) => handleInput(i)} type="password" value={confirmPass} placeholder={conf_pass_ph}/>
                        </div>
                        <button className="btn btn-profile" id="save-password-button" onClick={()=>submitPass()} type="button">Change Password</button>
                        </form>
        
                        </div>
                    </div>
                </div>
        
              </div>
        
        
              </div>
        
              
                </AnimatePage>) : (<Navigate to='/unauthorized' state={{path: location.pathname}} />)
            )
    
}
export default EditProfile;
