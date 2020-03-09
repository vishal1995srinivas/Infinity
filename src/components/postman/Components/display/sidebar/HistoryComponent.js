import React, { Component } from 'react';
import { Label } from 'semantic-ui-react';

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
	}
	handleLabelSelect = (event, url, method, title) => {
		this.props.handleHistoryClick(url, method, title);
	};
	render() {
		//console.log(this.props.ToSideBarHistory);
		if (this.props.ToSideBarHistory.length > 0) {
			let labels = this.props.ToSideBarHistory.map((requests, index) => {
				let title = null;
				if (requests.title == '' || requests.title == null) {
					title = requests.url;
				} else {
					title = requests.title;
				}
				if (requests.method == 'GET') {
					return (
						<div className="label" key={index}>
							<Label
								as="a"
								color="green"
								size="mini"
								onClick={(e) => {
									this.handleLabelSelect(e, `${requests.url}`, `${requests.method}`, `${title}`);
								}}
							>
								{title}
								<Label.Detail>{requests.method}</Label.Detail>
							</Label>
						</div>
					);
				} else if (requests.method == 'POST') {
					return (
						<div className="label" key={index}>
							<Label
								as="a"
								color="yellow"
								size="mini"
								onClick={(e) => {
									this.handleLabelSelect(e, `${requests.url}`, `${requests.method}`, `${title}`);
								}}
							>
								{title}
								<Label.Detail>{requests.method}</Label.Detail>
							</Label>
						</div>
					);
				} else if (requests.method == 'PUT') {
					return (
						<div key={index} className="label">
							<Label
								as="a"
								color="blue"
								size="mini"
								onClick={(e) => {
									this.handleLabelSelect(e, `${requests.url}`, `${requests.method}`, `${title}`);
								}}
							>
								{title}
								<Label.Detail>{requests.method}</Label.Detail>
							</Label>
						</div>
					);
				} else if (requests.method == 'DELETE') {
					return (
						<div className="label" key={index}>
							<Label
								as="a"
								color="red"
								size="mini"
								onClick={(e) => {
									this.handleLabelSelect(e, `${requests.url}`, `${requests.method}`, `${title}`);
								}}
							>
								{title}
								<Label.Detail>{requests.method}</Label.Detail>
							</Label>
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
	}
}

export default HistoryComponent;
