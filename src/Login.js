import React, {useState} from 'react';
import firebase from './firebase';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    async function loginUser(e) {
        e.preventDefault();
        let errorCode, errorMessage;
        await firebase.auth().signInWithEmailAndPassword(email, password).then(cred => {
            console.log(cred.user)
        }).catch(function(error) {
            errorCode = error.code;
            errorMessage = error.message;
        });
        if (errorCode) {
            document.getElementById("errorID").innerHTML = errorCode;
            document.getElementById("errorID").innerHTML += "<br>" + errorMessage;
        }
        setEmail('');
        setPassword('');
    }
    return (
        <div className="Login">
            <br /><br />
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <p id="errorID" style={{color : "red"}}></p>
                <label>email:</label><br />                
                <input type="text" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br /><br />
                <label>password:</label><br />                
                <input type="password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br /><br />
                <button>login</button>
            </form>
        </div>      
    );
}

export default Login;
