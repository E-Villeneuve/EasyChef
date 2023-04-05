import React from 'react';
import defavatar from '../../../images/defaultavatar.png';
import './profile.css'

function ProfileDropItem() {
    const full_name = () => {
        let name = localStorage.getItem('first_name') + localStorage.getItem('last_name');
        if (!name) return;
        return <span id='profiledrop_name'>{name}<br /></span>;
    }

    const get_phone = () => {
        let phone_num = localStorage.getItem('phone_number');
        if (phone_num) return <span id='profiledrop_phone'><br />{phone_num}</span>
    }

    const get_avatar = () => {
        // console.log(localStorage);
        let avatar = localStorage.getItem('avatar');
        // // console.log(avatar);
        // let ret_val = avatar ? avatar : defavatar;
        // // console.log(ret_val);
        // if (avatar === null) {
        //     console.log('test2' + avatar);
        //     return defavatar
        // };
        // console.log('test1' + avatar);
        // return avatar;
        return avatar ? avatar : defavatar;
    }

    return (
    <div className="profile" id={localStorage.getItem('email')}>
        <div id='profiledrop_wrap'>
            <img id='profilepic'
                src={ get_avatar()}
                alt={"Profile"}
            />
        <p>
        {full_name()}
        <b>{localStorage.getItem('email')}</b>
        {get_phone()}
        </p>
        </div>
    </div>
    );
}

export default ProfileDropItem;