import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

function Logout() {
    let navigate = useNavigate();

    useEffect(()=>{
        const auth = getAuth();
        signOut(auth).then(() => {
            localStorage.setItem("isAuth", "false");
            localStorage.removeItem("userEmail");
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
        
        // navigate("/login");
    }, [])

    return (
        <div></div>
    )
}

export default Logout