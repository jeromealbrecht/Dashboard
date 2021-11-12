import React, { useState, useEffect } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseApp = initializeApp({
	apiKey: 'AIzaSyDYRZBURVTMEMq7bEYMqaTmhm6b5sHxJmw',

	authDomain: 'backad-59c60.firebaseapp.com',

	projectId: 'backad-59c60'
});

const db = getFirestore();

// import { FiPlusCircle } from 'react-icons/fi';

const Hello = () => {
	const [ loadata, setLoadata ] = useState();

	// Ici je veux retourner le produit (lecture)
	const getUser = async () => {
		const list = [];
		const docRef = doc(db, 'User', 'user000');
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			list.push(docSnap.data());
			const newlist = list[0];
			setLoadata(newlist);
		} else {
			console.log('No such document!');
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<div className="container-fluid bgColor" style={{ height: '100vh' }}>
			<div className="col-12">
				<div className="row">
				<div className="col-md-1 offset-1 cardColor mt-5 text-center text-white size">
					<h4 className="mt-3 mb-4"> Bienvenue </h4>
					<div className="round">
						<FiPlusCircle size={40} />
					</div>
					<p>Ajouter menu</p>

				</div>
					{loadata ? (
						<div className="col-3 justify-content-center">
							<div
								className="offset-1 justify-content-center"
								style={{
									position: 'absolute',
									width: 250,
									height: 350,
									minHeight: 425,
									backgroundColor: 'white',
									marginTop: 5,
									justifySelf: 'center'
								}}
							>
								<p style={{ position: 'absolute', padding: 8 }}>{loadata.title}</p>
								<img
									src={loadata.image}
									alt="image"
									style={{
										position: 'absolute',
										justifyContent: 'center',
										width: '100%',
										padding: 2,
										marginTop: 50,
										borderRadius: 15
									}}
								/>
								<p style={{ position: 'absolute', padding: 4, marginTop: 300 }}>{loadata.category}</p>
								<p style={{ position: 'absolute', padding: 4, marginTop: 325 }} numberoflines={3}>
									{loadata.describe}.
								</p>
							</div>
						</div>
						
					) : (
						<div className="col-3 justify-content-center">
							<div className="offset-1" style={{ width: 250, height: 400, backgroundColor: 'white' }}>
								<p style={{ position: 'absolute', padding: 8 }}>Pas de données</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Hello;
