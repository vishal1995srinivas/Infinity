import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import { Component } from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';
import Postman from './postman/App';
import SignUp from './SignUp';
import SignIn from './SignIn';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/Login" component={SignIn} />
					<Route path="/Register" component={SignUp} />
					<Route path="/Auth" component={AuthenticatedComponent} />
					<Route path="/" exact component={SignIn} />
					<AuthenticatedComponent>
						{/* <Route path="/Protected" component={Protected} /> */}
						<Route path="/Postman" component={Postman} />
					</AuthenticatedComponent>
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
