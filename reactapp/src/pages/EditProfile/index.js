import EditProfileSignedIn from "./SignedIn";
import Unauthorized from "../Unauthorized";
import { useContext } from 'react';
import { AuthContext } from "../../App";

function EditProfile() {
    const { auth } = useContext(AuthContext);

    return (
        <>
        { auth ? (<EditProfileSignedIn/>) : (<Unauthorized/>) }
        </>
    );
}

export default EditProfile;
