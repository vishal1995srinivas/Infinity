import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import { Button, Select, Input, Dropdown, Segment, Icon } from 'semantic-ui-react';

import TabsComponent from './TabsComponent';
var validUrl = require('valid-url');
class MethodComponent extends Component {
	constructor(props) {
		super(props);
		const alert = this.props.alert;
		this.state = {
			headers: [ { key: '', value: '' } ],
			valueOfBody: 'none',
			bodyFormData: [ { key: '', value: '' } ],
			bodyFormUrlData: [ { key: '', value: '' } ],
			obj: null
		};
		this.objUpdate = this.objUpdate.bind(this);
		this.SubmitHandler = this.SubmitHandler.bind(this);
	}
	objSetToNull = () => {
		this.setState({ obj: null });
		this.props.alert.success('Test Case cleared in memory');
	};

	handleSelect = (event, data) => {
		this.props.handleSelect(event, data);
	};
	handleCollectionSelect = (event, data) => {
		// this.setState({ method: data.value });
		this.props.handleSaveToCollectionName(data.value);
		//console.log(data.value);
	};
	handleUrl = (event) => {
		this.props.handleUrl(event);
	};
	handleHeadersKeyChange = (event, index) => {
		this.state.headers[index].key = event.target.value;
		if (this.state.headers.length - 1 == index) {
			this.state.headers.push({ key: '', value: '' });
		}
		this.setState({ headers: this.state.headers });
	};
	handleHeadersValueChange = (event, index) => {
		this.state.headers[index].value = event.target.value;
		this.setState({ headers: this.state.headers });
	};
	handleBodyFormKeyChange = (event, index) => {
		this.state.bodyFormData[index].key = event.target.value;
		if (this.state.bodyFormData.length - 1 == index) {
			this.state.bodyFormData.push({ key: '', value: '' });
		}
		this.setState({ bodyFormData: this.state.bodyFormData });
	};
	handleBodyFormValueChange = (event, index) => {
		this.state.bodyFormData[index].value = event.target.value;
		this.setState({ bodyFormData: this.state.bodyFormData });
	};
	handleBodyFormUrlKeyChange = (event, index) => {
		this.state.bodyFormUrlData[index].key = event.target.value;
		if (this.state.bodyFormUrlData.length - 1 == index) {
			this.state.bodyFormUrlData.push({ key: '', value: '' });
		}
		this.setState({ headers: this.state.headers });
	};
	handleBodyFormUrlValueChange = (event, index) => {
		this.state.bodyFormUrlData[index].value = event.target.value;
		this.setState({ bodyFormUrlData: this.state.bodyFormUrlData });
	};
	handleChangeValueOfBody = (valueOfBody) => {
		if (valueOfBody === 'none') {
			this.setState({
				valueOfBody: valueOfBody,
				bodyFormData: [ { key: '', value: '' } ],
				bodyFormUrlData: [ { key: '', value: '' } ]
			});
		} else if (valueOfBody === 'form-data') {
			this.setState({
				// headers: this.state.headers.push({ key: "Content-Type", value: "multipart/form-data" }),
				valueOfBody: valueOfBody,
				bodyFormUrlData: [ { key: '', value: '' } ]
			});
		} else if (valueOfBody === 'Form-url-encoded') {
			this.setState({
				// headers: headers,
				valueOfBody: valueOfBody,
				bodyFormData: [ { key: '', value: '' } ]
			});
		}
	};
	SubmitHandler = () => {
		if (this.props.url == null || this.props.url == '') return this.props.alert.error('URL cannot be empty');
		let headers = [ ...this.state.headers ];
		let headersLength = headers.length;
		let newHeaders = headers.slice(0, headersLength - 1);
		if (this.props.method == 'GET') {
			this.props.updateStateFromSubmit(this.props.method, this.props.url, newHeaders, null, this.state.obj);
		} else {
			let bodyFormData = [ ...this.state.bodyFormData ];
			let bodyFormDataLength = bodyFormData.length;
			let newBodyFormData = bodyFormData.slice(0, bodyFormDataLength - 1);
			if (this.state.valueOfBody == 'form-data') {
				newHeaders.push({
					key: 'Content-Type',
					value: 'multipart/form-data'
				});
				this.props.updateStateFromSubmit(
					this.props.method,
					this.props.url,
					newHeaders,
					newBodyFormData,
					this.state.obj
				);
			} else if (this.state.valueOfBody == 'Form-url-encoded') {
				newHeaders.push({
					key: 'Content-Type',
					value: 'application/x-www-form-urlencoded'
				});
				let bodyFormUrlData = [ ...this.state.bodyFormUrlData ];
				let bodyFormUrlDataLength = bodyFormUrlData.length;
				let newBodyFormUrlData = bodyFormUrlData.slice(0, bodyFormUrlDataLength - 1);
				this.props.updateStateFromSubmit(
					this.props.method,
					this.props.url,
					newHeaders,
					newBodyFormUrlData,
					this.state.obj
				);
			} else {
				this.props.updateStateFromSubmit(this.props.method, this.props.url, newHeaders, null, this.state.obj);
			}
		}
	};
	objUpdate(arg) {
		if (arg.jsObject) {
			this.setState({ obj: arg.jsObject });
		}
	}
	render() {
		let sendButton = <div />;
		let saveButton = <div />;

		const { method, url } = this.props;
		const options = [
			{ key: 'get', value: 'GET', text: 'GET' },
			{ key: 'post', value: 'POST', text: 'POST' },
			{ key: 'put', value: 'PUT', text: 'PUT' },
			{ key: 'delete', value: 'DELETE', text: 'DELETE' }
		];
		const collections = this.props.collections.map((collection, index) => {
			return { key: collection._id, text: collection.collectionName, value: collection.collectionName };
		});
		sendButton = (
			<Button
				primary
				loading={this.props.sendLoading}
				icon
				labelPosition="right"
				className="submitBtn"
				size="medium"
				onClick={this.SubmitHandler}
				disabled={!validUrl.isUri(this.props.url)}
			>
				Send
				<Icon name="send" />
			</Button>
		);
		saveButton = (
			<Dropdown
				disabled={this.props.sendLoading || !validUrl.isUri(this.props.url)}
				search
				scrolling
				closeOnEscape
				clearable
				options={collections}
				selection
				onChange={this.handleCollectionSelect}
				value={this.props.SaveToCollectionName}
				fluid
				className="selectTag"
				placeholder="Add"
			/>
		);
		return (
			//This has to be refactored-> create a new component for only method,url,submit and save buttons
			<div className="urlComponent">
				<div className="method">
					<Select fluid value={method} options={options} className="selectTag" onChange={this.handleSelect} />
				</div>
				<div className="url">
					<Input
						transparent
						fluid
						inverted
						icon="globe"
						iconPosition="left"
						placeholder="URL here"
						className="inputUrl"
						value={url}
						onChange={this.handleUrl}
					/>
				</div>
				<div className="sendButton">{sendButton}</div>
				<div className="saveButton">{saveButton}</div>
				<div className="tabsComponent">
					<TabsComponent
						headers={this.state.headers}
						handleHeadersKeyChange={this.handleHeadersKeyChange}
						handleHeadersValueChange={this.handleHeadersValueChange}
						method={this.props.method}
						handleBodyFormKeyChange={this.handleBodyFormKeyChange}
						handleBodyFormValueChange={this.handleBodyFormValueChange}
						handleBodyFormUrlKeyChange={this.handleBodyFormUrlKeyChange}
						handleBodyFormUrlValueChange={this.handleBodyFormUrlValueChange}
						bodyFormData={this.state.bodyFormData}
						bodyFormUrlData={this.state.bodyFormUrlData}
						valueOfBody={this.state.valueOfBody}
						handleChangeValueOfBody={this.handleChangeValueOfBody}
						objUpdate={this.objUpdate}
						obj={this.state.obj}
						objSetToNull={this.objSetToNull}
					/>
				</div>
			</div>
		);
	}
}
export default withAlert()(MethodComponent);
