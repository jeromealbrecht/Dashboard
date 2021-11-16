import React, { useEffect, useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
//config
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

	const [ encoded, setEncoded ] = useState(); // Value img encoded
	const [ selectedOption, setSelectedOption ] = useState(); // props from select component
	const [ title, setTitle ] = useState(); // title form
	const [ describe, setDesc ] = useState(); //Describe
	const [ category, setCat ] = useState(); //Category
	const [ genre, setGenre ] = useState(); //genre

	// when data
	useEffect(
		() => {
			addTodo(data, title, category, describe, encoded, selectedOption); // great !
		},
		[ data, title, category, describe, encoded, selectedOption ]
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
				console.log('naturelle', genre, title);
				await setDoc(
					doc(db, selectedOption.value, title),
					{
						category: category,
						title: title,
						describe: describe,
						image: encoded
					},
					[ data, selectedOption, addTodo ]
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
						<StepOne
							data={data}
							setData={setData}
							imageSrc={imageSrc}
							setImageSrc={setImageSrc}
							loadata={loadata}
							setLoadata={setLoadata}
							selectedOption={selectedOption}
							setSelectedOption={setSelectedOption}
							title={title}
							setTitle={setTitle}
							describe={describe}
							setDesc={setDesc}
							category={category}
							setCat={setCat}
							genre={genre}
							setGenre={setGenre}
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
