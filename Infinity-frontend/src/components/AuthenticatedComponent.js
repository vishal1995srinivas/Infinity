import React, { Component } from 'react';
import { getJwt } from '../helpers/jwt';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

class AuthenticatedComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: undefined,
			token: undefined
		};
	}
	componentDidMount() {
		const jwt = getJwt();
		//console.log(jwt);
		if (jwt.noToken) {
			this.props.history.push('/login');
		} else {
			this.setState({
				user: jwt.userName,
				token: jwt.userToken
			});
		}
	}

	render() {
		if (this.state.user == undefined) {
			return (
				<div>
					<h1>Loading...</h1>
				</div>
			);
		}
		return <div>{this.props.children}</div>;
		//this.props.history.push('/Protected');
	}
}

export default withRouter(AuthenticatedComponent);
