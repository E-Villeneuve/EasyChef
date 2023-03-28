import React, { useState } from 'react';
import './profile.css'

function ProfileDropItem(profile) {
    const [defaultImage] = useState({});
    return (
    <div className="profile" id={profile.email}>
        <div id='profiledrop_wrap'>
            <img id='profilepic'
                src={
                    defaultImage[profile.email] === profile.email
                    ? defaultImage.linkDefault
                    : profile.avatar
                }
                alt={profile.email}
            />
        <p>
        {profile.first_name + ' ' + profile.last_name}
        <br />
        <b>{profile.email}</b>
        <br />
        {profile.phone_number}
        </p>
        </div>
    </div>
    );
}

export default ProfileDropItem;