import React, { Component } from 'react';
import { Label, List } from 'semantic-ui-react';
import Loader from 'react-loader-spinner';

class HistoryComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allrequests: [
				{ method: 'GET', url: 'www.google.com' },
				{ method: 'POST', url: 'www.facebook.com' },
				{ method: 'PUT', url: 'www.facebook.com' },
				{ method: 'DELETE', url: 'www.facebook.com' },
				{ method: 'DELETE', url: 'www.facebook.com' }
			]
		}; //This is also a stateless component
	} //To be completed
	handleLabelSelect = (event, url, method, title, data, headers, testJson) => {
		this.props.handleHistoryClick(url, method, title);
	};
	render() {
		//console.log(this.props.ToSideBarHistory);
		//If the request name is too lengthy ,then it goes past the label. Fix this by (request.title ...)
		if (this.props.historyLoading == false) {
			if (this.props.ToSideBarHistory.length > 0) {
				let labels = this.props.ToSideBarHistory.map((requests, index) => {
					console.log(requests);
					let title = null;
					let Untitled = 'Untitled Request';
					if (requests.title == '' || requests.title == null) {
						title = `${Untitled}`;
					} else {
						title = requests.title;
					}
					if (requests.method == 'GET') {
						return (
							<div className="label" key={index}>
								<List divided selection>
									<List.Item
										onClick={(e) => {
											this.handleLabelSelect(
												e,
												`${requests.url}`,
												`${requests.method}`,
												`${title}`,
												`${requests.data}`,
												`${requests.headers}`,
												`${requests.testJson}`
											);
										}}
									>
										<Label color="green" horizontal className="exampleMethod">
											{requests.method}
										</Label>
										<div className="example">{title}</div>
									</List.Item>
								</List>
								{/* <Label
								as="a"
								color="green"
								size="mini"
								onClick={(e) => {
									this.handleLabelSelect(e, `${requests.url}`, `${requests.method}`, `${title}`);
								}}
							>
								{title}
								<Label.Detail>{requests.method}</Label.Detail>
							</Label> */}
							</div>
						);
					} else if (requests.method == 'POST') {
						return (
							<div className="label" key={index}>
								<List divided selection>
									<List.Item
										onClick={(e) => {
											this.handleLabelSelect(
												e,
												`${requests.url}`,
												`${requests.method}`,
												`${title}`,
												`${requests.data}`,
												`${requests.headers}`,
												`${requests.testJson}`
											);
										}}
									>
										<Label color="yellow" horizontal className="exampleMethod">
											{requests.method}
										</Label>
										<div className="example">{title}</div>
									</List.Item>
								</List>
								{/* <Label
								as="a"
								color="yellow"
								size="mini"
								onClick={(e) => {
									this.handleLabelSelect(e, `${requests.url}`, `${requests.method}`, `${title}`);
								}}
							>
								{title}
								<Label.Detail>{requests.method}</Label.Detail>
							</Label> */}
							</div>
						);
					} else if (requests.method == 'PUT') {
						return (
							<div key={index} className="label">
								<List divided selection>
									<List.Item
										onClick={(e) => {
											this.handleLabelSelect(
												e,
												`${requests.url}`,
												`${requests.method}`,
												`${title}`,
												`${requests.data}`,
												`${requests.headers}`,
												`${requests.testJson}`
											);
										}}
									>
										<Label color="blue" horizontal className="exampleMethod">
											{requests.method}
										</Label>
										<div className="example">{title}</div>
									</List.Item>
								</List>
								{/* <Label
								as="a"
								color="blue"
								size="mini"
								onClick={(e) => {
									this.handleLabelSelect(e, `${requests.url}`, `${requests.method}`, `${title}`);
								}}
							>
								{title}
								<Label.Detail>{requests.method}</Label.Detail>
							</Label> */}
							</div>
						);
					} else if (requests.method == 'DELETE') {
						return (
							<div className="label" key={index}>
								<List divided selection>
									<List.Item
										onClick={(e) => {
											this.handleLabelSelect(
												e,
												`${requests.url}`,
												`${requests.method}`,
												`${title}`,
												`${requests.data}`,
												`${requests.headers}`,
												`${requests.testJson}`
											);
										}}
									>
										<Label color="red" horizontal className="exampleMethod">
											{requests.method}
										</Label>
										<div className="example">{title}</div>
									</List.Item>
								</List>
								{/* <Label
								as="a"
								color="red"
								size="mini"
								onClick={(e) => {
									this.handleLabelSelect(e, `${requests.url}`, `${requests.method}`, `${title}`);
								}}
							>
								{title}
								<Label.Detail>{requests.method}</Label.Detail>
							</Label> */}
							</div>
						);
					}
				});
				return (
					<div className="history" align="left">
						{labels}
					</div>
				);
			} else {
				return <div className="history">No Requests yet!</div>;
			}
		} else {
			return (
				<div>
					<Loader type="ThreeDots" color="black" height={100} width={100} />
				</div>
			);
		}
	}
}

export default HistoryComponent;
