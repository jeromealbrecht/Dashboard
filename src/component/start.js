import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiPlusCircle } from 'react-icons/fi';


const Start = () => {
	return (
		<div className="container-fluid bgColor">
			<div className="row">
				<div className="col-12 row m-0 justify-content-center">
					<div className="col-md-2 cardColor mt-4 mb-3 text-center text-white p-absolute">
						<h4 className="mt-3 mb-5 Mulish" style={{ fontSize: 20 }}>
							{' '}
							Bienvenue{' '}
						</h4>

						<FiPlusCircle size={60} color={'white'} style={{ cursor: 'pointer' }} className="btn" />
						<p className="Mulish mb-4" style={{ fontSize: 20 }}>
							Ajouter menu
						</p>

						<FiPlusCircle size={60} color={'white'} style={{ cursor: 'pointer' }} className="btn" />
						<p className="Mulish mb-4" style={{ fontSize: 20 }}>
							Ajouter menu
						</p>

						<FiPlusCircle size={60} color={'white'} style={{ cursor: 'pointer' }} className="btn" />
						<p className="Mulish mb-4" style={{ fontSize: 20 }}>
							Ajouter menu
						</p>

						<FiPlusCircle size={60} color={'white'} style={{ cursor: 'pointer' }} className="btn" />
						<p className="Mulish mb-2" style={{ fontSize: 20 }}>
							Ajouter menu
						</p>
					</div>
					<div className="col-10 p-1 mt-3 row justify-content-center">
						<h1 className="m-0 p-0 text-white text-center Mulish">L'adresse </h1>
						<h2 className="m-0 p-0 text-white text-center mt-5 mb-5 Mulish">
							Bienvenue sur votre Dashboard{' '}
						</h2>

						<div style={{ width: 525, height: '40%', backgroundColor: '#C21FC2', borderRadius: 5 }}>
                            <h4 style={{padding: 10, marginTop: 15}}>Titre</h4>
							<img
								src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
								alt="new"
								width={200}
								height={150}
                                style={{padding :10, marginLeft: 300, borderRadius: 15}}
							/>
						</div>
						<div
							style={{ width: 525, height: '40%', backgroundColor: '#C21FC2', borderRadius: 5 }}
							className="offset-1"
						/>
						<div
							style={{
								width: 525,
								height: '40%',
								backgroundColor: '#C21FC2',
								borderRadius: 5,
								marginTop: 25
							}}
						/>
						<div
							style={{
								width: 525,
								height: '40%',
								backgroundColor: '#C21FC2',
								borderRadius: 5,
								marginTop: 25
							}}
							className="offset-1"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Start;
