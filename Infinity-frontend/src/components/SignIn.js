import React, { Component } from 'react';
import './style.css';
import axios from 'axios';

class SignIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			error: '',
			formErrors: { email: '' },
			emailValid: false,
			formValid: false,
			isLoading: false
		};
	}
	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value }, () => {
			this.validateField(name, value);
		});
	};
	validateField(fieldName, value) {
		let fieldValidationErrors = this.state.formErrors;
		let emailValid = this.state.emailValid;
		switch (fieldName) {
			case 'email':
				emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
				fieldValidationErrors.email = emailValid ? '' : ' is invalid';
				break;
			default:
				break;
		}
		this.setState(
			{
				formErrors: fieldValidationErrors,
				emailValid: emailValid
			},
			this.validateForm
		);
	}
	validateForm() {
		this.setState({ formValid: this.state.emailValid });
	}
	errorClass(error) {
		return error.length === 0 ? '' : 'has-error';
	}
	onSubmit = (e) => {
		e.preventDefault();
		this.setState({
			isLoading: true
		});
		axios
			.post('https://infinity-dark-mode-api.herokuapp.com/users/authenticate', {
				email: this.state.email,
				password: this.state.password
			})
			.then((res) => {
				//console.log(res);
				if (res.data.status == 'error') {
					this.setState({ error: res.data.message });
				} else {
					//console.log('Res is', res, res.data.data.user._id, res.data.data.user.name, res.data.data.token);
					let userDetails = [
						{
							userName: res.data.data.user.name
						},
						{ userId: res.data.data.user._id },
						{ token: res.data.data.token }
					];
					localStorage.setItem('user-Details', JSON.stringify(userDetails));

					this.props.history.push('/infinity');
				}
			})
			.catch((err) => {
				console.log(err);
				this.setState({ error: 'Error Fetching Credentials', isLoading: false });
			});
	};

	render() {
		//console.log(this.state);
		return (
			<div>
				<div className="registerForm">
					<div className="Loader">&#8734;</div>
					<h2>Login</h2>

					<div className="input">
						<div className="inputBox">
							<label>Email</label>
							<input
								type="text"
								value={this.state.email}
								onChange={this.handleUserInput}
								name="email"
								placeholder="sundar@gmail.com"
								required
								autoComplete="off"
							/>
						</div>
						<div className="inputBox">
							<label>Password</label>
							<input
								type="password"
								value={this.state.password}
								onChange={this.handleUserInput}
								name="password"
								placeholder="123456789"
								required
							/>
						</div>
						<div className="error">{this.state.error}</div>
						{this.state.formValid ? (
							<div>
								{this.state.isLoading ? (
									<div className="inputBox">
										<i class="fa fa-refresh fa-spin" />
										<input type="submit" value="Signing In...." disabled />
									</div>
								) : (
									<div className="inputBox">
										<input
											type="submit"
											onClick={this.onSubmit}
											value="Sign In"
											disabled={!this.state.formValid}
										/>
									</div>
								)}
							</div>
						) : (
							<div />
						)}

						{/* <div className="inputBox">
							<input type="submit" name="" value="Sign In" onClick={this.onSubmit} />
						</div> */}
					</div>
					<p className="forget">
						Not a member yet ? <a href="/register">Register !</a>
					</p>
				</div>
			</div>
		);
	}
}
export default SignIn;
