import React, { Component } from 'react';
import axios from 'axios';
import { FormErrors } from './FormErrors';
import './Form.css';

class Register extends Component {
	constructor() {
		super();
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
	/*************************************************************************************** */
	handleSubmit(event) {
		console.log('sign-up handleSubmit, username: ');
		console.log(this.state.name, this.state.email, this.state.password);
		event.preventDefault();
		//request to server to add a new username/password
		this.setState({
			isLoading: true
		});
		axios
			.post('https://infinity-dark-mode-api.herokuapp.com//users/register', {
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
	/************************************************************************************************** */
	render() {
		return (
			<form className="demoForm" onSubmit={this.handleSubmit}>
				<h2>Sign up</h2>
				<div className="error">{this.state.error}</div>
				<div className="panel panel-default">
					<FormErrors formErrors={this.state.formErrors} />
				</div>
				<div className="Name">
					<label htmlFor="name">Name</label>
					<input
						type="name"
						className="form-control"
						name="name"
						placeholder="Name"
						value={this.state.name}
						onChange={this.handleUserInput}
						required
					/>
				</div>
				<div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						required
						className="form-control"
						name="email"
						placeholder="Email"
						value={this.state.email}
						onChange={this.handleUserInput}
					/>
				</div>
				<div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						className="form-control"
						name="password"
						placeholder="Password"
						value={this.state.password}
						onChange={this.handleUserInput}
					/>
				</div>
				{this.state.isLoading ? (
					<button type="submit" className="btn btn-primary" disabled={true}>
						Signing up...
					</button>
				) : (
					<button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>
						Sign up
					</button>
				)}
			</form>
		);
	}
}

export default Register;
