import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
import { FormErrors } from './FormErrors';
class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: '',
			formErrors: { email: '', password: '', name: '' },
			emailValid: false,
			passwordValid: false,
			formValid: false,
			nameValid: false,
			isLoading: false,
			error: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
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
		let passwordValid = this.state.passwordValid;
		let nameValid = this.state.nameValid;
		switch (fieldName) {
			case 'email':
				emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
				fieldValidationErrors.email = emailValid ? '' : ' is invalid';
				break;
			case 'password':
				passwordValid = value.length >= 6;
				fieldValidationErrors.password = passwordValid ? '' : ' is too short';
				break;
			case 'name':
				nameValid = value.length >= 3;
				fieldValidationErrors.name = nameValid ? '' : ' is too short';
				break;
			default:
				break;
		}
		this.setState(
			{
				formErrors: fieldValidationErrors,
				emailValid: emailValid,
				passwordValid: passwordValid,
				nameValid: nameValid
			},
			this.validateForm
		);
	}

	validateForm() {
		this.setState({ formValid: this.state.emailValid && this.state.passwordValid && this.state.nameValid });
	}

	errorClass(error) {
		return error.length === 0 ? '' : 'has-error';
	}
	handleSubmit(event) {
		event.preventDefault();
		this.setState({
			isLoading: true
		});
		axios
			.post('https://infinity-dark-mode-api.herokuapp.com/users/register', {
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			})
			.then((response) => {
				console.log(response);
				if (response.data.status == 'failure') {
					this.setState({
						error: response.data.message,
						isLoading: false
					});
				} else {
					this.props.history.push('/login');
				}
			})
			.catch((error) => {
				console.log('signup error: ');
				console.log(error);
			});
	}

	render() {
		//console.log(this.state.formErrors);
		return (
			<div>
				<div className="registerForm">
					<div className="Loader">&#8734;</div>
					<h2>Register</h2>

					<div className="input">
						<div className="inputBox">
							<label>Name</label>
							<input
								type="text"
								name="name"
								value={this.state.name}
								onChange={this.handleUserInput}
								required
								placeholder="Your Name"
								autoComplete="off"
							/>
						</div>
						<div className={`inputBox ${this.errorClass(this.state.formErrors.email)}`}>
							<label>Email</label>
							<input
								type="text"
								value={this.state.email}
								onChange={this.handleUserInput}
								name="email"
								placeholder="abc@xyz.com"
								required
								autoComplete="off"
							/>
						</div>
						<div className={`inputBox ${this.errorClass(this.state.formErrors.password)}`}>
							<label>Password</label>
							<input
								type="password"
								value={this.state.password}
								onChange={this.handleUserInput}
								name="password"
								placeholder="*********"
								required
							/>
						</div>
						<div className="error">{this.state.error}</div>
						<div className="panel panel-default">
							<FormErrors formErrors={this.state.formErrors} />
						</div>
						{this.state.formValid ? (
							<div>
								{this.state.isLoading ? (
									<div className="inputBox">
										<i class="fa fa-refresh fa-spin" />
										<input type="submit" value="Signing Up...." disabled />
									</div>
								) : (
									<div className="inputBox">
										<input
											type="submit"
											onClick={this.handleSubmit}
											value="Sign Up"
											disabled={!this.state.formValid}
										/>
									</div>
								)}
							</div>
						) : (
							<div />
						)}
					</div>
					<p className="forget">
						Already Registered ? <a href="/login">Login !</a>
					</p>
				</div>
			</div>
		);
	}
}
export default SignUp;
