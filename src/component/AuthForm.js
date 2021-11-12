import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import Input from '@material-ui/core/Input';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../AuthForm.css';
import '../AuthForm.js';
import { BrowserRouter } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';
import Start from '../navigation/Start';
import { getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { BrowserRouter as Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const auth = getAuth();

const AuthForm = (props) => {
	const navigate = useNavigate();

	const [ datas, setDatas ] = useState();
	const [ logged, setLogged ] = useState(false);
	const { adUser, setadUser } = props;
	const [ errorMessage, seterrorMessage ] = useState('');
	const [ redirect, setRedirect ] = useState(false);
	
	const logok = <p className="text-white">Bienvenue {adUser.displayName}</p>;
	const lognok = <p>Veuillez vérifier vos informations de connexion</p>;

	async function UpdateProfile() {
		updateProfile(auth.currentUser, {
			displayName: 'Tony'
		})
			.then(() => {
				alert('mise à jour ok');
				// ...
			})
			.catch((error) => {
				alert('bordelent');

				// ...
			});
	}

	useEffect(
		() => {
			if (datas) {
				SignIn(datas);
			}
		},
		[ datas ]
	);

	useEffect(
		() => {
			renderRedirect();
		},
		[ redirect ]
	);

	function renderRedirect() {
		if (redirect == true) {
			navigate('/Start');
		}
	}

	async function SignIn(datas) {
		signInWithEmailAndPassword(auth, datas.email, datas.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				setLogged(true);
				setadUser(user);
				setRedirect(true);

				// <Start />
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				const errorM = <p className="text-white">Veuillez vérifier vos informations de connexion</p>;
				seterrorMessage(errorM);
			}, []);
	}

	const { register, handleSubmit, watch, formState: { errors } } = useForm();
	const onSubmit = (data) => setDatas(data);

	return (
		<div className="col-3 d-flex justify-content-center pabso marge">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="col-6 d-flex justify-content-center m-auto">
					<div className="css-selector col-12" style={{ width: 400, height: 245, borderRadius: 25 }}>
						<div className="col-12 mt-3 text-white Raleway" style={{ paddingLeft: 20 }}>
							<h5>Entrer mail et mot de passe</h5>
						</div>
						<div className="form-floating mb-3 mt-3 m-auto col-11">
							<input
								type="email"
								className="form-control"
								id="floatingInput"
								placeholder="name@example.com"
								{...register('email')}
							/>
							<label for="floatingInput" className="Raleway">
								Adresse E-mail
							</label>
							{adUser ? logok : errorMessage}
						</div>
						<div class="form-floating mb-3 mt-3 m-auto col-11">
							<input
								type="password"
								className="form-control"
								id="floatingInput"
								placeholder="name@example.com"
								{...register('password', { required: true })}
							/>
							<label for="floatingInput" className="Raleway">
								Mot de passe
							</label>
						</div>
						<div className="col-12 text-center">
							<input type="submit" />
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AuthForm;

