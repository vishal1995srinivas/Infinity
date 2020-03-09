import React, { Component } from 'react';
import MainComponent from './main/MainComponent';
import SidebarComponent from './sidebar/SidebarComponent';

import { withAlert } from 'react-alert';
import AllResponse from './response/AllResponse';
import getHistory from '../db/getHistory';
import { getJwt } from '../../../../helpers/jwt';
import getCollections from '../db/getCollections';
import createCollection from '../db/createCollection';
import DeleteCollectionById from '../db/deleteCollectionById';
import addRequestToCollection from '../db/addRequestToCollection';
import createRequest from '../db/createRequest';
class DisplayComponent extends Component {
	constructor(props) {
		super(props);
		const alert = this.props.alert;
		this.updateStateFromSubmit = this.updateStateFromSubmit.bind(this);
		this.state = {
			method: 'GET',
			url: '',
			headers: [ { key: '', value: '' } ],
			bodyFormOrUrlData: [ { key: '', value: '' } ],
			ToResponseMethod: '',
			ToResponseUrl: '',
			ToResponseHeaders: [ { key: '', value: '' } ],
			ToResponseBodyFormOrUrlData: [ { key: '', value: '' } ],
			ToSideBarHistory: [],
			collectionName: '',
			collections: [],
			SaveToCollectionName: null,
			ToPlay: null,
			testCase: null,
			sendSwitch: true,
			title: ''
		};
	}
	handleTitle = (event) => {
		this.setState({ title: event.target.value });
	};
	updateTestCaseToNull = () => {
		this.setState({ testCase: null });
	};
	updateStateFromSubmit = async (method, url, headers, bodyFormOrUrlData, testJson) => {
		if (url !== '') {
			if (headers.length > 0) {
				if (this.state.SaveToCollectionName !== null) {
					this.state.collections.map(async (collection) => {
						if (collection.collectionName == this.state.SaveToCollectionName) {
							collection.requests.push({
								title: this.state.title,
								method: method,
								url: url,
								headers: headers,
								bodyFormOrUrlData: bodyFormOrUrlData,
								testCase: testJson
							});
							/************************************** */
							const jwt = getJwt();
							let userId = jwt.userId;
							let userToken = jwt.userToken;
							let request = {
								userId: `${userId}`,
								url: url,
								method: method,
								title: this.state.title,
								headers: headers,
								data: bodyFormOrUrlData,
								collectionName: this.state.SaveToCollectionName,
								testJson: testJson
							};
							let addRequest = await addRequestToCollection(request, userToken);
							console.log(addRequest);
							this.props.alert.success(
								`Successfully saved to ${this.state.SaveToCollectionName} Collection`
							);
							/************************************************************** */
							this.state.ToSideBarHistory.unshift({
								title: this.state.title,
								method: method,
								url: url
							});
						}
					});
				}
				// this.state.ToSideBarHistory.unshift({
				// 	title: this.state.title,
				// 	method: method,
				// 	url: url
				// });
				// /******************************************* */
				// const jwt = getJwt();
				// let userId = jwt.userId;
				// let userToken = jwt.userToken;
				// let request = {
				// 	userId: `${userId}`,
				// 	url: url,
				// 	method: method,
				// 	title: this.state.title,
				// 	data: bodyFormOrUrlData,
				// 	headers: headers,
				// 	testJson: testJson
				// };
				// try {
				// 	let requestAdded = await createRequest(userToken, request);
				// 	console.log(requestAdded);
				// 	this.props.alert.success(`Successfully saved to Requests`);
				// } catch (error) {
				// 	this.props.alert.error(`Error Saving to  Database`);
				// }
				// /********************************************************** */
				this.setState({
					ToResponseMethod: method,
					ToResponseUrl: url,
					ToResponseHeaders: headers,
					ToResponseBodyFormOrUrlData: bodyFormOrUrlData,
					ToSideBarHistory: this.state.ToSideBarHistory,
					testCase: testJson,
					sendSwitch: true
				});
			} else {
				if (this.state.SaveToCollectionName !== null && this.state.SaveToCollectionName !== '') {
					let newHeaders = [ { key: 'Content-Type', value: 'application/json' } ];
					this.state.collections.map(async (collection) => {
						if (collection.collectionName == this.state.SaveToCollectionName) {
							console.log(collection);
							try {
								collection.requests.push({
									title: this.state.title,
									method: method,
									url: url,
									headers: newHeaders,
									bodyFormOrUrlData: bodyFormOrUrlData,
									testCase: testJson
								});
								/*********************************** */
								const jwt = getJwt();
								let userId = jwt.userId;
								let userToken = jwt.userToken;
								let request = {
									userId: `${userId}`,
									url: url,
									method: method,
									title: this.state.title,
									headers: newHeaders,
									data: bodyFormOrUrlData,
									collectionName: this.state.SaveToCollectionName,
									testJson: this.state.testCase
								};
								let addRequest = await addRequestToCollection(request, userToken);
								console.log(addRequest);
								this.props.alert.success(
									`Successfully saved to ${this.state.SaveToCollectionName} Collection`
								);
								/************************************************************** */
							} catch (error) {
								console.log(error);
								this.props.alert.error('Error saving to database!');
							}
						}
					});
					this.state.ToSideBarHistory.unshift({
						title: this.state.title,
						method: method,
						url: url
					});
					this.setState({
						ToSideBarHistory: this.state.ToSideBarHistory,
						testCase: testJson,
						sendSwitch: true,
						ToResponseMethod: method,
						ToResponseUrl: url,
						ToResponseHeaders: [ { key: 'Content-Type', value: 'application/json' } ],
						ToResponseBodyFormOrUrlData: bodyFormOrUrlData
					});
				} else {
					this.state.ToSideBarHistory.unshift({
						title: this.state.title,
						method: method,
						url: url
					});

					/******************************************* */
					const jwt = getJwt();
					let userId = jwt.userId;
					let userToken = jwt.userToken;
					let request = {
						userId: `${userId}`,
						url: url,
						method: method,
						title: this.state.title,
						data: bodyFormOrUrlData,
						headers: headers,
						testJson: testJson
					};
					try {
						let requestAdded = await createRequest(userToken, request);
						console.log(requestAdded);
						this.props.alert.success(`Successfully saved to Requests`);
					} catch (error) {
						this.props.alert.error(`Error Saving to  Database`);
					}
					/*********************************************************** */

					this.setState({
						ToResponseMethod: method,
						ToResponseUrl: url,
						ToResponseHeaders: [ { key: 'Content-Type', value: 'application/json' } ],
						ToResponseBodyFormOrUrlData: bodyFormOrUrlData,
						ToSideBarHistory: this.state.ToSideBarHistory,
						testCase: testJson,
						sendSwitch: true
					});
				}
			}
		} else {
			this.props.alert.error('URL is empty.');
		}
	};
	handleSaveToCollectionName = (value) => {
		this.setState({ SaveToCollectionName: value });
	};
	handleSelect = (event, data) => {
		this.setState({ method: data.value });
	};
	handleUrl = (event) => {
		this.setState({ url: event.target.value });
	};
	handleHistoryClick = (url, method, title) => {
		this.setState({ method: method, url: url, title: title });
	};
	handleCollectionName = (value) => {
		this.setState({ collectionName: value });
	};
	handleCreateCollection = (event) => {
		let collectionExist = false;

		if (this.state.collectionName !== '') {
			this.state.collections.map((collection) => {
				if (collection.collectionName == this.state.collectionName) {
					this.props.alert.error(`${this.state.collectionName} already exists`);
					collectionExist = true;
				}
			});
			if (collectionExist == false) {
				let newCollection = [
					...this.state.collections,
					{
						collectionName: this.state.collectionName,
						requests: []
					}
				];

				/******************** */
				const jwt = getJwt();
				let userId = jwt.userId;
				let userToken = jwt.userToken;
				let result = createCollection(userId, userToken, this.state.collectionName);
				console.log(result);
				/**************************** */
				this.setState({ collections: newCollection, collectionName: '' });
				this.props.alert.success(`Collection ${this.state.collectionName} Created successfully`);
			}
		} else {
			this.props.alert.error('Collection Name cannot be empty');
		}
	};
	handleDeleteCollection = async (event, index) => {
		try {
			/**Add delete flag dont remove from database in the next update*********** */
			const jwt = getJwt();
			let userToken = jwt.userToken;
			let CollectionToBeDeleted = this.state.collections[index];
			//console.log(CollectionToBeDeleted);
			let idOfTheCollectionIs = CollectionToBeDeleted.id;
			//console.log(idOfTheCollectionIs);
			let deleteCollection = await DeleteCollectionById(userToken, idOfTheCollectionIs);

			/******************************************************* */
			let collectionAfterDelete = this.state.collections.filter((collection) => {
				return collection.id !== idOfTheCollectionIs;
			});
			this.setState({ collections: collectionAfterDelete });
			this.props.alert.success('Collection Deleted Successfully');
		} catch (error) {
			console.log(error);
			this.props.alert.error('Collection cannot be deleted. Try again later!');
		}
	};
	handlePlayCollection = (index) => {
		this.setState({ ToPlay: this.state.collections[index], sendSwitch: false });
	};
	ToggleToPlayOff = () => {
		this.setState({ ToPlay: null });
	};

	async componentDidMount() {
		const jwt = getJwt();
		let userId = jwt.userId;
		let userToken = jwt.userToken;
		let requestHistory = await getHistory(userId, userToken);
		let topHistory = requestHistory.requests.reverse();

		let collections = await getCollections(userId, userToken);

		this.setState({ ToSideBarHistory: topHistory, collections: collections });
	}

	render() {
		//console.log(this.state.ToPlay);
		return (
			<div className="display">
				<MainComponent
					handleTitle={this.handleTitle}
					title={this.state.title}
					updateStateFromSubmit={this.updateStateFromSubmit}
					handleSelect={this.handleSelect}
					handleUrl={this.handleUrl}
					method={this.state.method}
					url={this.state.url}
					collections={this.state.collections}
					handleSaveToCollectionName={this.handleSaveToCollectionName}
					SaveToCollectionName={this.SaveToCollectionName}
				/>
				<SidebarComponent
					title={this.state.title}
					ToSideBarHistory={this.state.ToSideBarHistory}
					handleHistoryClick={this.handleHistoryClick}
					handleCollectionName={this.handleCollectionName}
					collectionName={this.state.collectionName}
					handleCreateCollection={this.handleCreateCollection}
					collections={this.state.collections}
					handleDeleteCollection={this.handleDeleteCollection}
					handlePlayCollection={this.handlePlayCollection}
				/>
				<AllResponse
					sendSwitch={this.state.sendSwitch}
					method={this.state.ToResponseMethod}
					url={this.state.ToResponseUrl}
					headers={this.state.ToResponseHeaders}
					bodyFormOrUrlData={this.state.ToResponseBodyFormOrUrlData}
					ToPlay={this.state.ToPlay}
					ToggleToPlayOff={this.ToggleToPlayOff}
					testCase={this.state.testCase}
					updateTestCaseToNull={this.updateTestCaseToNull}
				/>
			</div>
		);
	}
}

export default withAlert()(DisplayComponent);
