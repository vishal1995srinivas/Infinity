import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			email: '',
			password: ''
		};
	}
	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	onSubmit = (e) => {
		e.preventDefault();

		axios
			.post('http://localhost:5000/users/authenticate', {
				email: this.state.email,
				password: this.state.password
			})
			.then((res) => {
				console.log('Res is', res, res.data.data.user._id, res.data.data.user.name, res.data.data.token);
				let userDetails = [
					{
						userName: res.data.data.user.name
					},
					{ userId: res.data.data.user._id },
					{ token: res.data.data.token }
				];
				localStorage.setItem('user-Details', JSON.stringify(userDetails));

				this.props.history.push('/Protected');
			})
			.catch((err) => {
				console.log(err);
			});
	};
	render() {
		// console.log(this.state);
		return (
			// <div>
			// 	<form onSubmit={(e) => this.onSubmit(e)}>
			// 		<label>email</label>
			// 		<input type="text" name="email" onChange={this.onChange} value={this.state.email} />
			// 		<label>Password</label>
			// 		<input type="password" name="password" onChange={this.onChange} value={this.state.password} />
			// 		<button type="submit">submit</button>
			// 	</form>
			// </div>

			<div class="row mt-5">
				<div class="col-md-6 m-auto">
					<div class="card card-body">
						<h1 class="text-center mb-3">
							<i class="fas fa-sign-in-alt" /> Login
						</h1>

						<form onSubmit={(e) => this.onSubmit(e)}>
							<div class="form-group">
								<label for="email">Email</label>
								<input
									type="email"
									id="email"
									name="email"
									class="form-control"
									placeholder="Enter Email"
									onChange={this.onChange}
									value={this.state.email}
								/>
							</div>
							<div class="form-group">
								<label for="password">Password</label>
								<input
									type="password"
									id="password"
									name="password"
									class="form-control"
									placeholder="Enter Password"
									onChange={this.onChange}
									value={this.state.password}
								/>
							</div>
							<button type="submit" class="btn btn-primary btn-block">
								Login
							</button>
						</form>
						<p class="lead mt-4">
							No Account? <a href="/register">Register</a>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
