import React, { useState, useEffect } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiPlusCircle } from 'react-icons/fi';
import { InputGroup, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import ImageUpload from 'image-upload-react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
// import { decode as base64_decode, encode as base64_encode } from 'base-64';
import Select from './select';

import { collection, query, where, getDocs } from 'firebase/firestore';

// Initialize Cloud Firestore through Firebase

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseApp = initializeApp({
	apiKey: 'AIzaSyDYRZBURVTMEMq7bEYMqaTmhm6b5sHxJmw',

	authDomain: 'backad-59c60.firebaseapp.com',

	projectId: 'backad-59c60'
});

const db = getFirestore();

const Initial = (props) => {
	const [ selectedOption, setSelectedOption ] = useState(); // props from select component
	const [ data, setData ] = useState();
	const [ loadata, setLoadata ] = useState();
	const [ imageSrc, setImageSrc ] = useState(); // form image source
	const [ encoded, setEncoded ] = useState(); // Value
	const [ title, setTitle ] = useState(''); // title
	const [ category, setCat ] = useState(''); // category
	const [ describe, setDesc ] = useState(''); // description

	const [ products, setProducts ] = useState(); // description

	const { register, handleSubmit, formState: { errors } } = useForm();
	const onSubmit = (data) => setData(data);

	// set url data
	const handleImageSelect = (e) => {
		setImageSrc(URL.createObjectURL(e.target.files[0]));
	};

	useEffect(() => {
		if (data) {
			//form only
			setTitle(data.title);
			setCat(data.category);
			setDesc(data.describe);
			addTodo(title, category, describe, encoded); // great !
		}
	}, [title, category, describe, encoded]);

	// write values to firebase database
	const addTodo = async () => {
		const response = await fetch(imageSrc);
		const blob = await response.blob();
		var reader = new FileReader();
		reader.onload = () => {
			setEncoded(reader.result);
		};
		reader.readAsDataURL(blob);

		if (data) {
			await setDoc(
				doc(db, 'User', selectedOption.value),
				{
					category: category,
					title: title,
					describe: describe,
					image: encoded
				},
				[data]
			);
		}
	};

	function getScrollHeight(elm) {
		var savedValue = elm.value;
		elm.value = '';
		elm._baseScrollHeight = elm.scrollHeight;
		elm.value = savedValue;
	}
	function onExpandableTextareaInput({ target: elm }) {
		// make sure the input event originated from a textarea and it's desired to be auto-expandable
		if (!elm.classList.contains('autoExpand') || !elm.nodeName === 'TEXTAREA') return;

		var minRows = elm.getAttribute('data-min-rows') | 0,
			rows;
		!elm._baseScrollHeight && getScrollHeight(elm);

		elm.rows = minRows;
		rows = Math.ceil((elm.scrollHeight - elm._baseScrollHeight) / 16);
		elm.rows = minRows + rows;
	}

	// global delegated event listener
	document.addEventListener('input', onExpandableTextareaInput);

	// Ici je veux retourner les produits (lecture)
	const getUser = async () => {
		const q = query(collection(db, 'User'));

		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			setProducts(doc.data());
		});
	};

	useEffect(() => {
		getUser();
	}, [products]);

	return (
		<div className="container-fluid css-selector m-0 p-0" style={{ height: '100vh' }}>
			<div className="row m-0 p-0">
				<div className="col-12 row m-0">
					{/* column card */}
				
					<div className="col-12 row space m-0 justify-content-center">
						<h1 className="m-0 text-white text-center mt-5">Bienvenue sur votre Dashboard</h1>
						<div className="col-10 row m-0">
							<h4 className="m-0 text-white p-3">Étape 1 : ajouter du contenu </h4>
							{/* First card */}
							<div className="col-3 text-center card">
								{loadata ? (
									<div class="container">
										<h3 className="m-0 text-success p-3">Titre</h3>
										<InputGroup className="mb-3">
											<InputGroup.Text id="basic-addon1">📌</InputGroup.Text>
											<FormControl
												placeholder={loadata.title}
												aria-label="Titre du menu"
												aria-describedby="basic-addon1"
												{...register('title')} // onChange={e=>
												// this.setState({ val: e.target.value })}
											/>
										</InputGroup>
										<h3 className="m-0 text-success">Catégorie</h3>
										<InputGroup className="mb-3 mt-3">
											<InputGroup.Text id="basic-addon1">📜</InputGroup.Text>
											<FormControl
												placeholder={loadata.category}
												aria-label="Username"
												aria-describedby="basic-addon1"
												{...register('category')} // onChange={e=>
												// 	this.setState({ val: e.target.value })}
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
												{...register('title')} // onChange={e=>
												// this.setState({ val: e.target.value })}
											/>
										</InputGroup>
										<h3 className="m-0 text-success">Catégorie</h3>
										<InputGroup className="mb-3 mt-3">
											<InputGroup.Text id="basic-addon1">📜</InputGroup.Text>
											<FormControl
												placeholder="Username"
												aria-label="Username"
												aria-describedby="basic-addon1"
												{...register('category')} // onChange={e=>
												// this.setState({ val: e.target.value })}
											/>
										</InputGroup>
									</div>
								)}
							</div>
							<div className="col-3 card offset-1">
								<div className="container">
									<h3 className="m-0 text-success p-3 text-center">Description</h3>
									{loadata ? (
										<textarea
											className="autoExpand"
											rows="3"
											data-min-rows="3"
											placeholder={loadata.describe}
											{...register('describe')}
											autoFocus
										/>
									) : (
										<textarea
											className="autoExpand"
											rows="3"
											data-min-rows="3"
											placeholder={'Entrez la description'}
											{...register('describe')}
											autoFocus
										/>
									)}
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
						<div className="col-10 row m-0">
							<div className="col-3" />
							<h4 className="m-0 text-white p-3 mt-5">Étape 2 : Choisir la catégorie & valider </h4>
							{/* First card */}
							<div className="col-3 text-center card">
								<div class="container">
									<h3 className="m-0 text-success p-3">Catégorie</h3>
									<Select selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
								</div>
							</div>

							<div className="col-3 offset-1 text-center card">
								<div class="container">
									<h3 className="m-0 text-success p-3">Valider</h3>
									{/* <Button /> */}
									<Button variant="success" onClick={handleSubmit(onSubmit)}>
										Envoyer les données
									</Button>{' '}
								</div>
							</div>
						</div>
					</div>

					{/* Boutton Select*/}
				</div>
			</div>
		</div>
	);
};

export default Initial;
