import { React } from 'react';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {

    function logIn(email,password){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem("isAuth", "true");
            localStorage.setItem("userEmail",user.email);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
    
            console.log(error.message)
        })
    }

    var email = "testing@gmail.com"
    var password = "testingpass"
    logIn(email,password)

    return (
        <div>test</div>
    )
}

export default Login