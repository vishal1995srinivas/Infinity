import React, { Component } from 'react';
import Response from './Response';
import ReactJson from 'react-json-view';
import { Icon, Button } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import { diff } from 'json-diff';
import Skeleton from 'react-skeleton-loader';
import { theme } from '../../../Utils';

class Display extends Component {
	constructor(props) {
		super(props);
		const alert = this.props.alert;
		this.ClickHandler = this.ClickHandler.bind(this);
		// this.highlightSyntax = this.highlightSyntax.bind(this);
		this.state = {
			result: [],
			requests: [],
			collectionName: null,
			collectionsRequestsLength: null,
			loading: false
		};
	}
	ClickHandler() {
		let newResult = [];
		for (let request of this.props.ToPlay.requests) {
			console.log(request);
			let title;
			if (request.title == '' || request.title == null) {
				title = request.url;
			} else {
				title = request.title;
			}
			let loading = (
				<div>
					{title} : <Icon loading name="asterisk" inverted />
				</div>
			);
			newResult.push(loading);
			this.setState(
				{
					result: newResult,
					loading: true,
					collectionName: this.props.collectionName,
					collectionsRequestsLength: this.props.ToPlay.requests.length
				},
				HandleRequests
			);
		}
		async function HandleRequests() {
			let newResult = [ ...this.state.result ];
			for (let i = 0; i < this.props.ToPlay.requests.length; i++) {
				try {
					//console.log(this.props.ToPlay.requests[i]);
					let result = await Response(this.props.ToPlay.requests[i]);
					// console.log(result);
					if (this.props.ToPlay.requests[i].testCase !== null) {
						let changes = diff(result, this.props.ToPlay.requests[i].testCase);
						if (changes == undefined) {
							let successJson = {
								TestCase: 'Matched',
								Operation: 'Success'
							};
							newResult[i] = <ReactJson src={successJson} theme={theme} />;
							console.log(newResult);
						} else {
							newResult[i] = <ReactJson src={changes} theme={theme} />;
							console.log(newResult);
						}
						this.setState({ result: newResult });
					}
				} catch (error) {
					console.log(error);
					let errorJson = {
						Error: `${error}, Message : ${error.message}`
					};
					newResult[i] = <ReactJson src={errorJson} theme={theme} />;
					this.setState({ result: newResult });
				}
			}
		}
	}
	render() {
		//console.log(this.props.ToPlay);
		if (
			this.state.collectionName !== this.props.ToPlay.name &&
			this.state.collectionsRequestsLength !== this.props.ToPlay.requests.length
		) {
			this.ClickHandler();
			return (
				<div className="response_tests">
					<Skeleton count={50} color="#1b1c1d" width="100%" />
					{/* <div className="Loader">&#8734;</div> */}

					{/* <Button onClick={this.ClickHandler} secondary>
						Click Here to get Test Results
					</Button> */}
				</div>
			);
		} else {
			console.log(this.state.loading);
			console.log(this.state.result);
			if (this.state.loading) {
				let loading = this.state.result.map((result, index) => {
					return (
						<div className="response_tests" key={index} align="left">
							{result}
						</div>
					);
				});
				return (
					<div align="left">
						<div>{loading}</div>
					</div>
				);
			} else {
				let loading = this.state.result.map((result, index) => {
					return (
						<div key={index} align="left">
							{result}
						</div>
					);
				});
				return (
					<div align="left">
						<div className="instructions">
							Test Results are as follows: <br>__new: TestCase data, __old: Fetched data</br>
						</div>
						<ReactJson src={loading} theme={theme} />
					</div>
				);
			}
		}
	}
}
export default withAlert()(Display);
