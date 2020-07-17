import React, {useEffect, useState, useRef} from 'react';
import firebase from './firebase';

const Home = () => {
    let correctAns = 0;
    const [email, setEmail] = useState('');
    const isMountedRef = useRef(null);
    
    useEffect(() => {
      isMountedRef.current = true;
      firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            if(isMountedRef.current) {
              setEmail(user.email);
              makeQuestion();
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
      document.querySelectorAll(".workspace")[0].style.display = "none";
    }
    function getRandomNumber() {
      let n = Math.floor(Math.random() * 10) + 1;
      return n;
    }
    function makeQuestion() {
      document.querySelectorAll(".workspace")[0].style.display = "block";
      document.getElementById("userAnswerID").value = "";
      document.getElementById("submitAnswerID").disabled = false;
      document.getElementById("nextBtnID").style.display = "none";
      let x = getRandomNumber();
      let y = getRandomNumber();
      correctAns = x * y;
      console.log("correct answer is " + correctAns);
      let questionText = "what is " + x + " x " + y + " = ";
      document.getElementById("questionStringID").innerHTML = questionText;
    }
    async function checkAns() {
      let uA = document.getElementById("userAnswerID").value;
      console.log("user answer is " + uA);
      let cA = String(correctAns);
      let result = 0;
      if (cA === uA) {
        console.log("YOU ARE CORRECT");      
        result = 1;
      } else {
        console.log("DUMBCUNT");
      }
      document.getElementById("submitAnswerID").disabled = true;
      document.getElementById("nextBtnID").style.display = "block";
      
      let u_id = [];
      await firebase.firestore().collection('math-user-db').where("email", "==", email).get().then((snapshot) => {
        console.log("working");
          snapshot.docs.forEach(doc => {
            u_id.push(doc.data().user_id)
          });            
      });
      if (u_id.length > 1) {
        console.log("error: we have multiple of that email");
        console.log(u_id);
      } else {
        let user_id = u_id[0];
        let question_id = 0;      
        await firebase.firestore().collection('math-question-db').get().then((snapshot) => {
          question_id = snapshot.size;
        });
        question_id += 1;
        let correct_answer = cA;
        let user_answer = uA;
        console.log("the user_id is " + user_id);
        console.log("the question_id is " + question_id);
        console.log("the correct_answer is " + correct_answer);
        console.log("the user_answer is " + user_answer);
        console.log("the result is " + result);
        // add to database            
        firebase.firestore().collection('math-question-db').add({
          question_id,
          user_id,
          correct_answer,
          user_answer,
          result
        })
        .then(() => {
        });
      }
    }
    
    return (
        <div className="Home">        
            <br /><br />
            <h1>Home page</h1>
            <div className="workspace" style={{display: "none"}}>
                <p id="questionStringID"></p>
                <input id="userAnswerID" autoComplete="off"></input>
                <button id="submitAnswerID" onClick={checkAns}>submit</button>
                <button id="nextBtnID" onClick={makeQuestion} style={{display: "none"}}>next</button>
            </div>
        </div>      
    );
  }
  export default Home;