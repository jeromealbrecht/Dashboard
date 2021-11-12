import React, { useEffect, useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { InputGroup, FormControl } from 'react-bootstrap';
// import ImageUpload from 'image-upload-react';
// import { useForm } from 'react-hook-form';
import StepOne from '../component/StepOne';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import IsConnected from '../controller/IsConnected';
import { useNavigate } from 'react-router-dom';

// Initialize Cloud Firestore through Firebase

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseApp = initializeApp({
	apiKey: 'AIzaSyDYRZBURVTMEMq7bEYMqaTmhm6b5sHxJmw',

	authDomain: 'backad-59c60.firebaseapp.com',

	projectId: 'backad-59c60'
});

const db = getFirestore();
const auth = getAuth();

const Start = (props) => {
	const navigate = useNavigate();
	const [ adUser, setadUser ] = useState(); // from props of Is Connected
	const [ data, setData ] = useState();
	const [ loadata, setLoadata ] = useState();
	const [ imageSrc, setImageSrc ] = useState(); // form image source
	const [ redirect, setRedirect ] = useState(false);
	const [ title, setTitle ] = useState(); //Title
	const [ category, setCat ] = useState(); //Category
	const [ describe, setDesc ] = useState(); //Describe
	const [ encoded, setEncoded ] = useState(); // Value img encoded
	const [ selectedOption, setSelectedOption ] = useState(); // props from select component

	console.log(selectedOption);

	// when data
	useEffect(
		() => {
			if (data) {
				//form only
				setTitle(data.title);
				setCat(data.category);
				setDesc(data.describe);
				addTodo(title, category, describe, encoded); // great !
			}
		},
		[ data, title, category, describe, encoded ]
	);

	// write values to firebase database
	const addTodo = async () => {
		const response = await fetch(imageSrc);
		const blob = await response.blob();
		var reader = new FileReader();
		reader.onload = () => {
			setEncoded(reader.result);
		};
		reader.readAsDataURL(blob);
		// set doc
		if (data) {
			if (selectedOption) {
				console.log('naturelle', selectedOption);
				await setDoc(
					doc(db, 'User', selectedOption.value),
					{
						category: category,
						title: title,
						describe: describe,
						image: encoded
					},
					[ data, selectedOption ]
				);
			}
		}
		setData();
	};

	function SignOut() {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
			})
			.catch((error) => {
				// An error happened.
			});
	}

	return (
		<div className="container-fluid css-selector m-0 p-0" style={{ height: '100vh' }}>
			<div className="row">
				<div class="col-md-12">
					<IsConnected {...props} adUser={adUser} setadUser={setadUser} />
					{adUser ? (
						// <h1 className="text-center text-white mt-5">Bienvenue {adUser.displayName}</h1>
						<StepOne
							data={data}
							setData={setData}
							imageSrc={imageSrc}
							setImageSrc={setImageSrc}
							loadata={loadata}
							setLoadata={setLoadata}
							selectedOption={selectedOption}
							setSelectedOption={setSelectedOption}
						/>
					) : (
						// setRedirect(true)
						''
					)}
				</div>
			</div>
		</div>
	);
};

export default Start;
