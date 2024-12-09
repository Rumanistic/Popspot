import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './pages/Header';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Footer from './pages/Footer';
import reportWebVitals from './reportWebVitals';

function Main(){
	const [user, setUser] = useState(sessionStorage.getItem('name'));
	
	return (
			<BrowserRouter>
				<Header user={user} setUser={setUser}/>
			  	<App user={user} setUser={setUser}/>
				<Footer />
			</BrowserRouter>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />) 
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();