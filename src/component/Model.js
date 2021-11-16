import React, { useState, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import '../App.css';
import AdressImg from '../images/adresse-exterieur.jpg';
import AuthForm from './AuthForm';
import { UserContext } from '../index';

const base64Image = '...';

function Model(props) {
	const [ adUser, setadUser ] = useState('');
// console.log('adUser de Model' , adUser);
	var ladate = new Date();
	
	useEffect(() => {
		document.title = "L'adresse"
	 }, []);

	const user = useContext(UserContext);

	const logok = <p className="text-white">Bienvenue {adUser.displayName}</p>;
	const lognok = <p>Veuillez vérifier vos informations de connexion</p>;
	// redux, react-router

	const [ date, setDate ] = useState(ladate.getDate() + '/' + (ladate.getMonth() + 1) + '/' + ladate.getFullYear());
	const [ hour, setHour ] = useState(ladate.getHours().toString() + 'h et ' + ladate.getMinutes() + ' minutes');

	return (
		<div className="container-fluid css-selector" style={{ height: '100vh' }}>
			<div className="">
				<div>
					<div className="col-12 m-0 p-0 justify-start-end">
						<div className="row Vcenter">
							<div className="col-12 Vcenter mt-5">
								<div className="col-3 p-0 m-0">
									<p className="mt-3" style={{ color: 'white', paddingLeft: 350 }}>
										{' '}
										<h1 className="Raleway AdressColor" style={{ fontSize: 25 }}>
											L'adresse
										</h1>
									</p>
								</div>
							</div>
						</div>

						<div className="col-12 d-flex justify-content-center">
							<Card.Img
								src={AdressImg}
								style={{
									marginTop: 0,
									width: 800,
									borderBottomRightRadius: 100,
									borderBottomLeftRadius: 100,
									position: 'absolute'
								}}
								alt="Card image"
							/>
							<AuthForm adUser={adUser} setadUser={setadUser} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Model;
