import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import ReactDiffViewer from 'react-diff-viewer';
import JsDiff from 'diff';
import VisualDiff from 'react-visual-diff';
import { diffString, diff } from 'json-diff';
var Diff = require('diff');

// var diff = require('deep-diff').diff;
var jsondiffpatch = require('jsondiffpatch');
require('colors');

class Tests extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: '',
			urlString: '',
			error: false,
			JsonData: '',
			headers: [ {} ],
			method: '',
			bodyFormOrUrlData: [ {} ],
			collectionJson: null,
			collectionName: null
		};
	}
	async fetchfunction(method, headers, url, bodyFormOrUrlData) {
		let myHeaders = null;
		if (method == 'GET') {
			// console.log(headers);
			if (headers.length > 0) {
				myHeaders = new Headers();
				headers.map((headers) => {
					myHeaders.append(headers.key, headers.value);
				});
			}
			let newUrl = url;
			if (url.search('https://') == -1) {
				newUrl = `https://${this.props.url}`;
			}
			this.GetData(`${newUrl}`, method, myHeaders)
				.then(async (data) => {
					//console.log(data);
					//console.log(this.props.testCase);
					let changes = diff(data, this.props.testCase);
					if (changes == undefined) {
						let successJson = {
							TestCase: 'Perfectly Matched',
							Operation: 'Success'
						};
						this.setState({
							JsonData: successJson,
							urlString: url,
							method: method,
							headers: headers,
							bodyFormOrUrlData: bodyFormOrUrlData
						});
					} else {
						this.setState({
							JsonData: changes,
							urlString: url,
							method: method,
							headers: headers,
							bodyFormOrUrlData: bodyFormOrUrlData
						});
					}
				})
				.catch((error) => {
					console.log(error.message);
					let errorJson = {
						Error: `${error}, Message : ${error.message}`
					};
					this.setState({
						JsonData: errorJson,
						urlString: newUrl,
						error: true,
						urlString: url,
						method: method,
						headers: headers,
						bodyFormOrUrlData: bodyFormOrUrlData
					});
				});
		} else {
			if (headers.length > 0) {
				myHeaders = new Headers();
				headers.map((headers) => {
					myHeaders.append(headers.key, headers.value);
				});
			}
			let newUrl = url;
			if (url.search('https://') == -1) {
				newUrl = `https://${url}`;
			}
			this.fetchData(`${newUrl}`, bodyFormOrUrlData, method, myHeaders)
				.then((data) => {
					let changes = diff(data, this.props.testCase);
					if (changes == undefined) {
						let successJson = {
							TestCase: 'Perfectly Matched',
							Operation: 'Success'
						};
						this.setState({
							JsonData: successJson,
							urlString: url,
							method: method,
							headers: headers,
							bodyFormOrUrlData: bodyFormOrUrlData
						});
					} else {
						this.setState({
							JsonData: changes,
							urlString: url,
							method: method,
							headers: headers,
							bodyFormOrUrlData: bodyFormOrUrlData
						});
					}
				})
				.catch((error) => {
					console.log(error);

					let errorJson = {
						Error: `${error}, Message : ${error.message}`
					};
					this.setState({
						JsonData: errorJson,
						error: true,
						urlString: url,
						method: method,
						headers: headers,
						bodyFormOrUrlData: bodyFormOrUrlData
					});
				});
		}
	}
	async fetchData(url = '', data = {}, method, myHeaders) {
		// Default options are marked with *
		const response = await fetch(url, {
			method: method, // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: myHeaders,
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *client
			body: JSON.stringify(data) // body data type must match "Content-Type" header
		});
		return await response.json(); // parses JSON response into native JavaScript objects
	}
	async GetData(url = '', method, myHeaders) {
		// Default options are marked with *
		const response = await fetch(url, {
			method: method, // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: myHeaders,
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer' // no-referrer, *client
		});
		return await response.json(); // parses JSON response into native JavaScript objects
	}
	render() {
		console.log(this.state.JsonData);

		const { url } = this.props;
		const { isLoading, error, JsonData, urlString, method, headers, bodyFormOrUrlData } = this.state;
		if (
			urlString !== url ||
			method !== this.props.method ||
			headers !== this.props.headers ||
			bodyFormOrUrlData !== this.props.bodyFormOrUrlData
		) {
			let fetchData = this.fetchfunction(
				this.props.method,
				this.props.headers,
				this.props.url,
				this.props.bodyFormOrUrlData
			);
			return (
				<div>
					<Loader type="ThreeDots" color="black" height={100} width={100} />
				</div>
			);
		} else if (this.state.JsonData) {
			if (this.state.error) {
				return (
					<div className="response" align="left">
						<ReactJson src={JsonData} theme="monokai" />
					</div>
				);
			} else {
				console.log(this.state.JsonData);
				return (
					<div className="response" align="left">
						{/* <div>
							<pre>
								<code>{this.state.JsonData}</code>
							</pre>
						</div> */}
						<ReactJson src={JsonData} theme="monokai" sortKeys />
					</div>
				);
			}

			{
				/* <div className="instructions">
						kind - indicates the kind of change; will be one of the following:<br />
						<ul>
							<li>N - indicates a newly added property/element</li>
							<li>D - indicates a property/element was deleted</li>
							<li>E - indicates a property/element was edited </li>
							<li>A - indicates a change occurred within an array</li>
						</ul>
					</div>
					<br />
					<ReactJson src={JsonData} theme="monokai" /> */
			}
		}

		//return <div className="response">response</div>;
	}
}
export default Tests;
