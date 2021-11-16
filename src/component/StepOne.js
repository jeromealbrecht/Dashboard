import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import ImageUpload from 'image-upload-react';
import { useForm } from 'react-hook-form';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import AuthForm from './AuthForm';
import IsConnected from '../controller/IsConnected';
import Select from './select';
import '../js/clock';
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

const StepOne = (props) => {
	const { data, 
		setData, 
		imageSrc, 
		setImageSrc, 
		selectedOption, 
		setSelectedOption, 
		title, 
		setTitle, 
		describe,
		setDesc,
		category,
		setCat,
		genre,
		setGenre
	   } = props;

	const [ adUser, setadUser ] = useState(''); // from props of Is Connected
	const [ loadata, setLoadata ] = useState();
	const [ products, setProducts ] = useState();

	const { register, handleSubmit, formState: { errors } } = useForm();
	const onSubmit = (data) => setData(data);


	const handleImageSelect = (e) => {
		setImageSrc(URL.createObjectURL(e.target.files[0]));
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
		document.title = "L'adresse"
		getUser();
	}, []);
	

	
	return (
		<div className="col-12 d-flex justify-content-center">
			<div className="col-1">
				<h1>hey</h1>
			</div>
		<div className="col-11 row m-0">
			<IsConnected {...props} adUser={adUser} setadUser={setadUser} />
			<h1 className="m-0 text-white text-center mt-5 mb-3">Bienvenue sur votre Dashboard, {adUser.displayName}</h1>
			<h4 className="m-0 text-white p-3">Étape 1 : ajouter du contenu </h4>
			{/* First card */}
			<div className="col-3 text-center card">
				{products ? (
					<div className="container">
						<h3 className="m-0 text-success p-3">Titre</h3>
						<InputGroup className="mb-3">
							<InputGroup.Text id="basic-addon1">📌</InputGroup.Text>
							<FormControl
								placeholder={products.title}
								aria-label="Titre du menu"
								aria-describedby="basic-addon1"
								{...register('title')} 
								onChange={e=> setTitle(e.target.value)} //setdata title
							/>
						</InputGroup>
						<h3 className="m-0 text-success">Catégorie</h3>
						<InputGroup className="mb-3 mt-3">
							<InputGroup.Text id="basic-addon1">📜</InputGroup.Text>
							<FormControl
								placeholder={products.category ?? 'ex: Viandes, Poissons'}
								aria-label="Username"
								aria-describedby="basic-addon1"
								{...register('category')} // onChange={e=>
								onChange={e=> setCat(e.target.value)} //setdata title

							/>
						</InputGroup>
					</div>
				) : (
					<div class="container">
						<h3 className="m-0 text-success p-3">Titre</h3>
						<InputGroup className="mb-3">
							<InputGroup.Text id="basic-addon">📌</InputGroup.Text>
							<FormControl
								placeholder="ex: Tartare de Saumon"
								aria-label="Titre du menu"
								aria-describedby="basic-addon1"
								{...register('title')}
								onChange={e=> setTitle(e.target.value)} //setdata title

							/>
						</InputGroup>
						<h3 className="m-0 text-success">Catégorie</h3>
						<InputGroup className="mb-3 mt-3">
							<InputGroup.Text id="basic-addon2">📜</InputGroup.Text>
							<FormControl
								placeholder="ex: Viandes, Poissons"
								aria-label="Username"
								aria-describedby="basic-addon1"
								{...register('category')} // onChange={e=>
								onChange={e=> setCat(e.target.value)} //setdata category

							/>
						</InputGroup>
					</div>
				)}
			</div>
            {/* Second card */}
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
							onChange={e=> setDesc(e.target.value)} //setdata desc
							autoFocus
						/>
					) : (
						<textarea
							className="autoExpand"
							rows="3"
							data-min-rows="3"
							placeholder={'Entrez la description'}
							{...register('describe')}
							onChange={e=> setDesc(e.target.value)} //setdata desc
							autoFocus
						/>
					)}
				</div>
			</div>
            {/* Third card */}
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
            {/* Second Steps */}
			<div className="col-3" />
			<h4 className="m-0 text-white p-3 mt-5">Étape 2 : Choisir la catégorie et valider </h4>
			{/* First card */}
			<div className="col-3 text-center card">
				<div class="container">
					<h3 className="m-0 text-success p-3">Genre</h3>
					{/* <InputGroup className="mb-3">
							<InputGroup.Text id="basic-addon">🍽️</InputGroup.Text>
							<FormControl
								placeholder="ex: Repas"
								aria-label="Titre du menu"
								aria-describedby="basic-addon1"
								{...register('genre')}
								onChange={e=> setGenre(e.target.value)} //setdata genre

							/>
						</InputGroup> */}
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
			<div class="col-5">
				<Button variant="success" onClick={SignOut}>
					Se déconnecter
				</Button>{' '}
			</div>
		</div>
		</div>
		
	);
};

export default StepOne;
