import React, { Component } from 'react';
import Response from './Response';
import ReactJson from 'react-json-view';
import { Icon, Button } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import { diff } from 'json-diff';

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
			let newResult = [];
			for (let i = 0; i < this.props.ToPlay.requests.length; i++) {
				try {
					console.log(this.props.ToPlay.requests[i]);
					let result = await Response(this.props.ToPlay.requests[i]);
					// console.log(result);
					if (this.props.ToPlay.requests[i].testCase !== null) {
						let changes = diff(result, this.props.ToPlay.requests[i].testCase);
						if (changes == undefined) {
							let successJson = {
								TestCase: 'Matched',
								Operation: 'Success'
							};
							newResult[i] = (
								<ReactJson
									src={successJson}
									theme={{
										base00: '272822',
										base01: '383830',
										base02: '49483e',
										base03: '75715e',
										base04: 'a59f85',
										base05: 'f8f8f2',
										base06: 'f5f4f1',
										base07: 'f9f8f5',
										base08: 'f92672 ',
										base09: 'fd971f',
										base0A: 'f4bf75 ',
										base0B: 'a6e22e',
										base0C: 'a1efe4 ',
										base0D: '66d9ef ',
										base0E: 'ae81ff ',
										base0F: 'cc6633 '
									}}
								/>
							);
							console.log(newResult);
						} else {
							newResult[i] = (
								<ReactJson
									src={changes}
									theme={{
										base00: '272822',
										base01: '383830',
										base02: '49483e',
										base03: '75715e',
										base04: 'a59f85',
										base05: 'f8f8f2',
										base06: 'f5f4f1',
										base07: 'f9f8f5',
										base08: 'f92672 ',
										base09: 'fd971f',
										base0A: 'f4bf75 ',
										base0B: 'a6e22e',
										base0C: 'a1efe4 ',
										base0D: '66d9ef ',
										base0E: 'ae81ff ',
										base0F: 'cc6633 '
									}}
								/>
							);
							console.log(newResult);
						}
						this.setState({ result: newResult });
					}
				} catch (error) {
					console.log(error);
					let errorJson = {
						Error: `${error}, Message : ${error.message}`
					};
					newResult[i] = (
						<ReactJson
							src={errorJson}
							theme={{
								base00: '272822',
								base01: '383830',
								base02: '49483e',
								base03: '75715e',
								base04: 'a59f85',
								base05: 'f8f8f2',
								base06: 'f5f4f1',
								base07: 'f9f8f5',
								base08: 'f92672 ',
								base09: 'fd971f',
								base0A: 'f4bf75 ',
								base0B: 'a6e22e',
								base0C: 'a1efe4 ',
								base0D: '66d9ef ',
								base0E: 'ae81ff ',
								base0F: 'cc6633 '
							}}
						/>
					);
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
				<div className="response">
					<div className="Loader">&#8734;</div>

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
						<div className="response" key={index} align="left">
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
						<ReactJson
							src={loading}
							theme={{
								base00: '272822',
								base01: '383830',
								base02: '49483e',
								base03: '75715e',
								base04: 'a59f85',
								base05: 'f8f8f2',
								base06: 'f5f4f1',
								base07: 'f9f8f5',
								base08: 'f92672 ',
								base09: 'fd971f',
								base0A: 'f4bf75 ',
								base0B: 'a6e22e',
								base0C: 'a1efe4 ',
								base0D: '66d9ef ',
								base0E: 'ae81ff ',
								base0F: 'cc6633 '
							}}
						/>
					</div>
				);
			}
		}
	}
}
export default withAlert()(Display);
