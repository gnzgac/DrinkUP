import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

function Logout() {
    let navigate = useNavigate();

    useEffect(()=>{
        localStorage.setItem("isAuth", "false");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("prodID");

        const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
        
        navigate("/Login");
    }, [])

    return (
        <div></div>
    )
}

export default Logout