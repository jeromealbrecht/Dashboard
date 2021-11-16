import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Allproducts from './component/Allproducts';
import Model from './component/Model';
import Start from './navigation/Start';
import Initial from './component/initial';
import NimBuzz from './exercice/NimBuzz';
import Hello from './component/hello';

const userInfosContext = {
	name: 'jéjé',
	birthDate: '26/11/1985'
};
export const UserContext = React.createContext(userInfosContext.birthDate);

ReactDOM.render(
	<UserContext.Provider value={userInfosContext}>
		<React.StrictMode>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Model />} />
					<Route path="/Start" element={<Start />} />
					<Route path="/Initial" element={<Initial />} />
					<Route path="/NimBuzz" element={<NimBuzz />} />
				</Routes>
			</BrowserRouter>
		</React.StrictMode>
	</UserContext.Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
