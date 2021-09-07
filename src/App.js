import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import 'semantic-ui-css/semantic.min.css';
// import { Icon } from 'semantic-ui-react';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDYRZBURVTMEMq7bEYMqaTmhm6b5sHxJmw",
  authDomain: "backad-59c60.firebaseapp.com",
  projectId: "backad-59c60",
  storageBucket: "backad-59c60.appspot.com",
  messagingSenderId: "692325332308",
  appId: "1:692325332308:web:2c9e6b2d73ddc254dcc4c1",
  measurementId: "G-EZZN5QYFQR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
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
    );
}

export default App;
