import React, { Component } from 'react';
import Response from './Response';
import ReactJson from 'react-json-view';
import { Icon, Button } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import ReactDiffViewer from 'react-diff-viewer';
var diff = require('deep-diff').diff;
// import Prism from 'prismjs';
var jsonDiff = require('json-diff');

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
			collectionsRequestsLength: null
		};
	}
	// highlightSyntax = (str) => (
	// 	<pre
	// 		style={{ display: 'inline' }}
	// 		dangerouslySetInnerHTML={{
	// 			__html: Prism.highlight(str, Prism.languages.javascript)
	// 		}}
	// 	/>
	// );
	ClickHandler() {
		let newResult = [];
		for (let request of this.props.ToPlay.requests) {
			console.log(request);
			if (request !== null) {
				let title = null;
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
			}
		}
		this.setState(
			{
				result: newResult,
				collectionName: this.props.collectionName,
				collectionsRequestsLength: this.props.ToPlay.requests.length
			},
			HandleRequests
		);
		async function HandleRequests() {
			for (let i = 0; i < this.props.ToPlay.requests.length; i++) {
				try {
					if (this.props.ToPlay.requests[i] !== null) {
						let result = await Response(this.props.ToPlay.requests[i]);
						if (this.props.ToPlay.requests[i].testCase !== null) {
							/************************************************* */
							// let output = jsonDiff.diffString(this.props.ToPlay.requests[i].testCase, result);
							// console.log(output);
							// newResult[i] = output;
							// this.setState({ result: newResult });
							/********************************************* */
							// if (output == '') {
							// 	let successJson = {
							// 		TestCase: 'Matched',
							// 		Operation: 'Success'
							// 	};
							// 	newResult[i] = (
							// 		<div className="response" align="left">
							// 			{successJson}
							// 			{/* <ReactJson src={successJson} theme="monokai" /> */}
							// 		</div>
							// 	);
							// } else {
							// 	newResult[i] = (
							// 		<div className="response" align="left">
							// 			{JSON.stringify(output)}
							// 			{/* <ReactJson src={output} theme="monokai" /> */}
							// 		</div>
							// 	);
							// }
							// this.setState({ result: newResult });
							/************************** */
							// let difference = jsonDiff.diff(result, this.props.ToPlay.requests[i].testCase);
							// console.log(difference);
							// newResult[i] = <div>{difference}</div>;
							/********************************* */
							// let StringifyingTestCase = JSON.stringify(this.props.ToPlay.requests[i].testCase);
							// let StringifyingResult = JSON.stringify(result);
							// newResult[i] = (
							// 	<ReactDiffViewer
							// 		oldValue={StringifyingTestCase}
							// 		newValue={StringifyingResult}
							// 		splitView={true}
							// 		// renderContent={this.highlightSyntax}
							// 	/>
							// );
							// this.setState({ result: newResult });
							/********************************************* */
							let changes = diff(result, this.props.ToPlay.requests[i].testCase);
							if (changes) {
								console.log(changes);
								newResult[i] = <ReactJson src={changes} theme="monokai" />;
								this.setState({ result: newResult });
							} else {
								let successJson = {
									TestCase: 'Matched',
									Operation: 'Success'
								};
								newResult[i] = <ReactJson src={successJson} theme="monokai" />;
								this.setState({ result: newResult });
							}
						} else {
							newResult[i] = <ReactJson src={result} theme="monokai" />;
							this.setState({ result: newResult });
						}
					}
				} catch (error) {
					console.log(error);
					let errorJson = {
						Error: `${error}, Message : ${error.message}`
					};
					newResult[i] = <ReactJson src={errorJson} theme="monokai" />;
				}
			}
		}
	}
	render() {
		console.log(this.props.ToPlay);
		if (
			this.state.collectionName !== this.props.ToPlay.name &&
			this.state.collectionsRequestsLength !== this.props.ToPlay.requests.length
		) {
			return (
				<div className="response">
					<Button onClick={this.ClickHandler} secondary>
						Click Here to get Test Results
					</Button>
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
					<div>{loading}</div>
				</div>
			);
		}
	}
}
export default withAlert()(Display);
