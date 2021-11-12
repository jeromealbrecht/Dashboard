import React, { useState, useEffect } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import Empty from './Empty';

const firebaseApp = initializeApp({
	apiKey: 'AIzaSyDYRZBURVTMEMq7bEYMqaTmhm6b5sHxJmw',
	authDomain: 'backad-59c60.firebaseapp.com',
	projectId: 'backad-59c60'
});
const db = getFirestore();

const Allproducts = () => {
	const [ products, setProducts ] = useState(); // description
	const [ title, setTitle ] = useState();

	// console.log(products);

	const getUser = async () => {
		const q = query(collection(db, 'User'));
		const Array = [];
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			const { title, describe, image, category } = doc.data();
			Array.push({
				id: doc.id,
				title,
				describe,
				image,
				category
			});
		});
		setProducts(Array)
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<div className="container-fluid css-selector m-0 p-0" style={{ height: '100vh' }}>
			<div>
				{products ? (
					products.map((item, index) => {
						const { id, describe, title } = item;
						return (
							<div key={index}>
								<h2>{id}</h2>
								<h2>{describe}</h2>
								<h2>{title}</h2>
							</div>
						);
					})
				) : (
					<Empty />
				)}
			</div>
		</div>
	);
};

export default Allproducts;
