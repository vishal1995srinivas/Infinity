import React, { Component } from 'react';
import '../styles/header.css';
import { getJwt } from '../../../../helpers/jwt';
import { Dropdown, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

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
		let letter = username.charAt(0).toUpperCase();
		return (
			<div className="logo">
				<div className="header">
					<div className="title" />
					<div className="out">
						<div className="AppName">&#8734;</div>
					</div>
					{/* Refactor this logout to sparate compo */}
					<div className="logout">
						<Icon name="user" />
						<Dropdown text={letter}>
							<Dropdown.Menu>
								<Dropdown.Item text="Logout" onClick={this.logOutHandler} />
							</Dropdown.Menu>
						</Dropdown>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(HeaderComponent);
