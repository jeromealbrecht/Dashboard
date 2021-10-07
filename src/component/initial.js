import React, { useState, useEffect } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiPlusCircle } from 'react-icons/fi';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import ImageUpload from 'image-upload-react';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Initialize Cloud Firestore through Firebase

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseApp = initializeApp({
	apiKey: 'AIzaSyDYRZBURVTMEMq7bEYMqaTmhm6b5sHxJmw',

	authDomain: 'backad-59c60.firebaseapp.com',

	projectId: 'backad-59c60'
});

const db = getFirestore();

const Initial = () => {
	const [ data, setData ] = useState('');
	const [ imageSrc, setImageSrc ] = useState(); // form image source
	const [ value, setValue ] = useState(''); // Value

	const [ title, setTitle ] = useState(''); // title
	const [ category, setCat ] = useState(''); // category
	const [ describe, setDesc ] = useState(''); // description
	const [ FBtitle, setFBTitle ] = useState('');

	const { register, handleSubmit, formState: { errors } } = useForm();
	const onSubmit = (data) => console.log('data', data);

	useEffect(
		() => {
			if (data) {
				//form only
				setTitle(data.title);
				setCat(data.category);
				setDesc(data.describe);
				// console.log('image', imageSrc);
				addTodo(title, category, describe); // great !
			}
		},
		[ data ]
	);

	const handleImageSelect = (e) => {
		setImageSrc(URL.createObjectURL(e.target.files[0]));
	};

	// write values to firebase database

	const addTodo = async () => {
		await setDoc(doc(db, 'User', 'user000'), {
			category: category,
			title: title,
			describe: describe
			//   imageURL: imageSrc,
		});
	};

	function getScrollHeight(elm) {
		var savedValue = elm.value;
		elm.value = '';
		elm._baseScrollHeight = elm.scrollHeight;
		elm.value = savedValue;
	}

	function onExpandableTextareaInput({ target: elm }) {
		// make sure the input event originated from a textarea and it's desired to be auto-expandable
		if (!elm.classList.contains('autoExpand') || !elm.nodeName == 'TEXTAREA') return;

		var minRows = elm.getAttribute('data-min-rows') | 0,
			rows;
		!elm._baseScrollHeight && getScrollHeight(elm);

		elm.rows = minRows;
		rows = Math.ceil((elm.scrollHeight - elm._baseScrollHeight) / 16);
		elm.rows = minRows + rows;
	}

	// global delegated event listener
	document.addEventListener('input', onExpandableTextareaInput);

	// Ici je veux retourner le produit (lecture)
	const getUser = async () => {
		const list = [];
		const docRef = doc(db, 'User', 'user000');
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			list.push(docSnap.data());
			setValue(list);
			// setFBTitle(list[0].title)
		} else {
			console.log('No such document!');
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	console.log('data', data);

	return (
		<body className="doby">
			<div className="container-fluid bgColor">
				<div className="row m-0 p-0">
					<div className="col-12 row m-0">
						{/* column card */}
						<div className="col-md-1 cardColor mt-5 text-center text-white size">
							<h4 className="mt-3 mb-4"> Bienvenue </h4>

							<FiPlusCircle size={40} />
							<p>Ajouter menu</p>
							{/*
                <FiPlusCircle size={50} /> */}
						</div>
						<div className="col-11 row space m-0 justify-content-center">
							<h1 className="m-0 text-white text-center mt-5">Bienvenue sur votre Dashboard </h1>
							<div className="col-10 row m-0">
								<h4 className="m-0 text-white p-3">Étape 1 : ajouter du contenu </h4>
								{/* First card */}
								<div className="col-3 text-center card">
									{value ? (
										<div class="container">
											<h3 className="m-0 text-success p-3">Titre</h3>
											<InputGroup className="mb-3">
												<InputGroup.Text id="basic-addon1">📌</InputGroup.Text>
												<FormControl
													placeholder={value[0].title}
													aria-label="Titre du menu"
													aria-describedby="basic-addon1"
													{...register('title')} // onChange={e=> this.setState({ val: e.target.value })}
												/>
											</InputGroup>
											<h3 className="m-0 text-success">Catégorie</h3>
											<InputGroup className="mb-3 mt-3">
												<InputGroup.Text id="basic-addon1">📜</InputGroup.Text>
												<FormControl
													placeholder={value[0].category}
													aria-label="Username"
													aria-describedby="basic-addon1"
													{...register('category')} // onChange={e=> this.setState({ val: e.target.value })}
												/>
											</InputGroup>
										</div>
									) : (
										<div class="container">
											<h3 className="m-0 text-success p-3">Titre</h3>
											<InputGroup className="mb-3">
												<InputGroup.Text id="basic-addon1">📌</InputGroup.Text>
												<FormControl
													placeholder="titrent"
													aria-label="Titre du menu"
													aria-describedby="basic-addon1"
													{...register('title')} // onChange={e=> this.setState({ val: e.target.value })}
												/>
											</InputGroup>
											<h3 className="m-0 text-success">Catégorie</h3>
											<InputGroup className="mb-3 mt-3">
												<InputGroup.Text id="basic-addon1">📜</InputGroup.Text>
												<FormControl
													placeholder="Username"
													aria-label="Username"
													aria-describedby="basic-addon1"
													{...register('category')} // onChange={e=> this.setState({ val: e.target.value })}
												/>
											</InputGroup>
										</div>
									)}
								</div>
								<div className="col-3 card offset-1">
									<div class="container">
										<h3 className="m-0 text-success p-3 text-center">Description</h3>
										<textarea
											className="autoExpand"
											rows="3"
											data-min-rows="3"
											placeholder="Auto-Expanding Textarea"
											{...register('describe')}
											autoFocus
										/>
									</div>
								</div>
								<div className="col-3 offset-1 p-absolute">
									<ImageUpload
										className="border-r"
										handleImageSelect={handleImageSelect}
										imageSrc={imageSrc}
										setImageSrc={setImageSrc}
										style={{
											width: '100%',
											height: '100%',
											background: 'gold'
										}}
									/>
								</div>
							</div>
							<div style={{ position: 'absolute', marginTop: 380, marginLeft: 2500 }}>
								{/* <Button /> */}
								<Button variant="success" onClick={handleSubmit(onSubmit)}>
									Success
								</Button>{' '}
							</div>
						</div>
					</div>
				</div>
			</div>
		</body>
	);
};

export default Initial;
