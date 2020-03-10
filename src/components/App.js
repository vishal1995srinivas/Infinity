import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Home';

import { Component } from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';
import Login from './Login';
import Protected from './Protected';
import Register from './Register';
import Postman from './postman/App';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/Login" component={Login} />
					<Route path="/Register" component={Register} />
					<Route path="/Auth" component={AuthenticatedComponent} />
					<Route path="/" exact component={Home} />
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
