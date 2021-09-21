import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import MenuCard from './component/card';
// import { useForm } from "react-hook-form";
import { FiPlusCircle } from 'react-icons/fi';

// Source: https://www.holadevs.com/pregunta/73106/error-firebase-db-is-not-defined

function App() {
	return (
		<div className="container-fluid bgColor h-75">
			<div className="row">
				<div className="col-12 row m-0">
					<div className="col-md-1 cardColor mt-4 mb-3 text-center text-white p-absolute">
						<h4 className="mt-3 mb-5"> Bienvenue </h4>

						<FiPlusCircle size={40} />
						<p>Ajouter menu</p>
						{/* <FiPlusCircle size={50}/> */}
					</div>
					<div className="col-10 mt-3 row space">
						<h1 className="m-0 text-white text-center mb-5">Bienvenue sur votre Dashboard </h1>

						<div className="p-0 offset-1">
							<MenuCard />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
