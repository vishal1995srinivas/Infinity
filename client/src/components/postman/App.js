import React from 'react';
import logo from './logo.svg';
import './App.css';
import DisplayComponent from './Components/display/DisplayComponent';
import HeaderComponent from './Components/header/HeaderComponent';
import FooterComponent from './Components/footer/FooterComponent';
import styles from './Components/styles/mainStyles.css';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
const options = {
	// you can also just use 'bottom center'
	position: positions.BOTTOM_CENTER,
	timeout: 3000,
	offset: '30px',
	// you can also just use 'scale'
	transition: transitions.SCALE
};
function App() {
	return (
		<div className="App">
			<AlertProvider template={AlertTemplate} {...options}>
				<HeaderComponent />
				<DisplayComponent />
				<FooterComponent />
			</AlertProvider>
		</div>
	);
}

export default App;
