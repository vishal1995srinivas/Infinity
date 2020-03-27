import React, { Component } from 'react';

class Protected extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	logOutHandler = () => {
		localStorage.removeItem('user-Details');
		this.props.history.push('/login');
	};
	render() {
		return (
			<div>
				<button type="submit" onClick={this.logOutHandler}>
					Log Out
				</button>
			</div>
		);
	}
}

export default Protected;
