import { React } from 'react';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {

    // function signUp(email,password){
    //     createUserWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //         const user = userCredential.user;
    //         localStorage.setItem("isAuth", "true");
    //         localStorage.setItem("userEmail",user.email);           
    //          // signed up and logged in
    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    
    //         console.log(errorMessage)
    //     })
    // }

    const signUp = async () => {
        try {
          const user = await createUserWithEmailAndPassword(
            auth, 
            email, 
            password
          );
          localStorage.setItem("isAuth", "true");
          localStorage.setItem("userEmail",user.email);     
          navigate("/");
        } catch (error) {
          return error;
        }
    }

    var email = "testing@gmail.com"
    var password = "testingpass"
    signUp(email,password)

    return (
        <div>test</div>
    )
}

export default Signup