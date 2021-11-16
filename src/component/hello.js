import React, { useState, useEffect } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import Divider from '@material-ui/core/Divider';
import IsConnected from '../controller/IsConnected';
import { Card } from 'react-bootstrap';
import AdressImg from '../images/adresse-exterieur.jpg';

const firebaseApp = initializeApp({
	apiKey: 'AIzaSyDYRZBURVTMEMq7bEYMqaTmhm6b5sHxJmw',

	authDomain: 'backad-59c60.firebaseapp.com',

	projectId: 'backad-59c60'
});

const db = getFirestore();

// import { FiPlusCircle } from 'react-icons/fi';

const Hello = (props) => {
	var ladate = new Date();
	const [ date, setDate ] = useState(ladate.getDate() + '/' + (ladate.getMonth() + 1) + '/' + ladate.getFullYear());
	const [ hour, setHour ] = useState(ladate.getHours().toString() + 'h et ' + ladate.getMinutes() + ' minutes');

	const [ loading, setLoading ] = useState();
	const [ data, setData ] = useState();

	const [ adUser, setadUser ] = useState('');

	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/onecall?lat=49.894067&lon=2.295753&lang=fr&units=metric&exclude=alerts&appid=cdbad52d9046fd36ad8b43226e0b0e50'
		)
			//

			.then((response) => response.json())
			.then((json) => setData(json))
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

	console.log(data);
	// Ici je veux retourner le produit (lecture)
	const br = `\n`;
	return (
		<div className="container-fluid css-selector" style={{ height: '100vh' }}>
			<div className="col-12">
				<IsConnected {...props} adUser={adUser} setadUser={setadUser} />
				<div className="row d-flex justify-content-evenly">
					<div className="col-3 m-0 p-0 justify-content-center mt-3">
						<div
							className="col-12"
							style={{ width: 250, height: 400, backgroundColor: '#6B365F', borderRadius: 5 }}
						>
							<h1 className="Raleway text-white text-center pt-3" style={{ fontSize: 25 }}>
								L'adresse
							</h1>
							<h4 className="Raleway text-white text-center">Bienvenue, {adUser.displayName}</h4>
							<h5 className="Raleway text-white text-center">Nous sommes le {date},</h5>
							<h5 className="Raleway text-white text-center">
								dehors il fait {data ? data.current.temp : ''} ° C
							</h5>

							<div className="col-12 bg-warning d-flex justify-content-center bg-warning mt-3">
								<Card.Img
									src={AdressImg}
									style={{
										marginTop: 5,
										width: 225,
										position: 'absolute'
									}}
									alt="Card image"
								/>
							</div>
						</div>
					</div>
					<div className="col-9 m-0 p-0 bg-warning mt-3">
						<Card.Img
							src={AdressImg}
							style={{
								marginTop: 0,
								width: '55%',
								borderBottomRightRadius: 100,
								borderBottomLeftRadius: 100,
								position: 'absolute'
							}}
							alt="Card image"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hello;
