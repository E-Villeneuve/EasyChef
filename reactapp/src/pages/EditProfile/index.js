import EditProfileSignedIn from "./SignedIn";
import Unauthorized from "../Unauthorized";
import { useContext } from 'react';
import { UserContext } from "../../App";

function EditProfile() {
    const { auth } = useContext(UserContext);

    return (
        <>
        { auth ? (<EditProfileSignedIn/>) : (<Unauthorized/>) }
        </>
    );
}

export default EditProfile;
