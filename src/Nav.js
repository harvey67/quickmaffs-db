import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import firebase from './firebase';

const Nav = () => {
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                document.getElementById("UserDetails").style.display = "block";
                document.getElementById("UserDetails").innerHTML = user.email;
            } else {
                document.getElementById("UserDetails").style.display = "none";
                document.getElementById("UserDetails").innerHTML = "";
            }
        });
    });

    async function signOut() {        
        await firebase.auth().signOut().then(() => {
            console.log("user is signed out");
        });
    }
    return (
      <div className="Nav">
          <li className="LinkBtn"><Link to="/">Home</Link></li>
          <li className="LinkBtn"><Link to="/Dashboard">Dashboard</Link></li>
          <li className="LinkBtn"><Link to="/CreateAccount">Create Account</Link></li>
          <li className="LinkBtn"><Link to="/Login">Login</Link></li>
          <li className="LinkBtn" ><button id="LogoutBtnID" onClick={signOut}>Logout</button></li>
          <li className="LinkBtn" id="UserDetails" style={{display: "none"}}></li>
          
      </div>      
    );
  }

export default Nav;
