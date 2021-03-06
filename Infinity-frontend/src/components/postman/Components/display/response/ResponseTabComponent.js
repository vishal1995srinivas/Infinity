import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Skeleton from 'react-skeleton-loader';
import { theme } from '../../Utils';
import GetData from './testCollection/GetData';
import fetchData from './testCollection/FetchData';

class ResponseTabComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: '',
			urlString: '',
			error: '',
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
			GetData(`${newUrl}`, method, myHeaders)
				.then((data) => {
					this.props.SendLoadingSwitch();
					this.setState({
						JsonData: data,
						urlString: url,
						method: method,
						headers: headers,
						bodyFormOrUrlData: bodyFormOrUrlData
					});
				})
				.catch((error) => {
					console.log(error.message);
					let errorJson = {
						Error: `${error}, Message : ${error.message}`
					};
					this.props.SendLoadingSwitch();
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
			fetchData(`${newUrl}`, bodyFormOrUrlData, method, myHeaders)
				.then((data) => {
					this.props.SendLoadingSwitch();
					this.setState({
						JsonData: data,
						urlString: url,
						method: method,
						headers: headers,
						bodyFormOrUrlData: bodyFormOrUrlData
					});
					console.log(this.state.JsonData); // JSON data parsed by `response.json()` call
				})
				.catch((error) => {
					console.log(error);

					let errorJson = {
						Error: `${error}, Message : ${error.message}`
					};
					this.props.SendLoadingSwitch();
					this.setState({
						JsonData: errorJson,
						urlString: url,
						method: method,
						headers: headers,
						bodyFormOrUrlData: bodyFormOrUrlData
					});
				});
		}
	}

	render() {
		const { url } = this.props;
		const { isLoading, error, JsonData, urlString, method, headers, bodyFormOrUrlData } = this.state;
		if (url == '') {
			return (
				<div className="responseContent">
					<div className="LoaderInResponse">&#8734;</div>
					Type URI to fetch data ⬆
				</div>
			);
		} else if (
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
					<Skeleton count={50} color="#1b1c1d" width="100%" />
					{/* <Loader type="ThreeDots" color="black" height={100} width={100} /> */}
				</div>
			);
		} else if (this.state.JsonData) {
			return (
				<div className="responseContent" align="left">
					<ReactJson src={JsonData} theme={theme} />
				</div>
			);
		}
	}
}
export default ResponseTabComponent;
