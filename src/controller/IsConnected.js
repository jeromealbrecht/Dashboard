import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const auth = getAuth();

const IsConnected = (props) => {
	const navigate = useNavigate();

	const { adUser, setadUser } = props;

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setadUser(user);
			const uid = user.uid;
		} else {
			setadUser('');
			navigate('/');
		}
	});

	return <isConnected {...props} adUser={adUser} setadUser={setadUser} />;
};

export default IsConnected;
