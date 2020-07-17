import React, {useEffect, useState, useRef} from 'react';
import firebase from './firebase';

const Dashboard = () => {
    const [email, setEmail] = useState('');
    const isMountedRef = useRef(null);
    
    useEffect(() => {
      isMountedRef.current = true;
      firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            if(isMountedRef.current) {
              setEmail(user.email);
              getResults();
            }
          } else {
            if(isMountedRef.current) {
              setEmail('');
              noUser();
            }
          }
      });
      return () => isMountedRef.current = false;
    }); 
    
    function noUser() {
        document.querySelectorAll(".results")[0].style.display = "none";
    }

    async function getResults() {        
        let user_id;
        await firebase.firestore().collection('math-user-db').where("email", "==", email).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                user_id = doc.data().user_id;
            });
        });
        let num_correct = 0;
        let total = 0;
        if (user_id) {
            await firebase.firestore().collection('math-question-db').where("user_id", "==", user_id).get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    if (doc.data().result === 1) {
                        num_correct += 1;
                    }
                    total += 1;
                });
            });
            showResults(num_correct, total);
        }
    }
    function showResults(num_c, tot) {
        document.querySelectorAll(".results")[0].style.display = "block";
        let correctText = "You scored " + num_c + " correct";
        let incorrectText = "You scored " + (tot - num_c) + " incorrect";
        let totalText = "Score is " + Math.floor(100 * num_c / tot) + "%";
        document.getElementById("correct").innerHTML = correctText;
        document.getElementById("incorrect").innerHTML = incorrectText;
        document.getElementById("total").innerHTML = totalText;
    }
    return (
        <div className="Dashboard">
            <br /><br />
            <h1>Dashboard</h1>
            <div className="results" style={{display: "none"}}>
                <p id="correct" style={{color: "green"}}></p>
                <p id="incorrect" style={{color: "red"}}></p>
                <p id="total"></p>
            </div>
        </div>      
    );
}

export default Dashboard;
