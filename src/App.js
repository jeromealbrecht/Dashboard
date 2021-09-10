import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';
import { doc, setDoc, getDoc } from "firebase/firestore"; 

// https://firebase.google.com/docs/firestore/quickstart?hl=es#initialize

// Initialize Cloud Firestore through Firebase

import { initializeApp } from "firebase/app"

import { getFirestore } from "firebase/firestore"

const firebaseApp = initializeApp({

  // ma config

});



const db = getFirestore();

// Source: https://www.holadevs.com/pregunta/73106/error-firebase-db-is-not-defined

function App() {
  
  const [value, setValue] = useState('');

  const addTodo = async () => {
    await setDoc(doc(db, "User", "user000"), {
      title: "Los Angeles",
      describe: "CA",
      imageURL: "USA"
    });
  }

  addTodo();

  const getUser = async () => {
    const docRef = doc(db, "User", "user000");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  
  useEffect(() => {
    getUser()
  }, []);





  return (
    
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 gradient row m-0">
        <div className="col-2 cardColor height mt-3 mb-3">cc</div>
          <div className="col-9 mt-3 mb-3 row space">          
          <h1 className="p-4 text-white text-center">Bienvenue sur votre Dashboard </h1>

          <div className="col-2 height2 hexagon ml-3 text-center middle"><Icon disabled name='cloud upload' className="" size='big' color='red' /></div>
          <div className="col-2 cardColor height2"><Icon disabled name='assistive listening systems' size={150} /></div>
          <div className="col-2 cardColor height2"></div>
          <div className="col-2 cardColor height2"></div>
          <div className="col-2 cardColor height2"></div>
          <div className="col-2 cardColor height2 offset+1"></div>
          
          <div className="col-10 cardColor"></div>
        </div>

        </div>
      </div>
      </div>
    );
}

export default App;
