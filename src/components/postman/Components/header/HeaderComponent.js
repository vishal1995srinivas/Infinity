import React, { Component } from 'react';
import '../styles/header.css';
import { getJwt } from '../../../../helpers/jwt';

class HeaderComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	logOutHandler = () => {
		localStorage.removeItem('user-Details');
		this.props.history.push('/login');
	};
	render() {
		const jwt = getJwt();
		let username = jwt.userName;
		return (
			<div className="logo">
				POSTMAN
				<div className="header">
					<div className="title">Welcome {username} </div>
					<div className="logout" onClick={this.logOutHandler}>
						<a href="/login">Logout</a>
					</div>
				</div>
			</div>
		);
	}
}

export default HeaderComponent;
