import React, { Component } from 'react';
import { Label, List } from 'semantic-ui-react';
import Skeleton from 'react-skeleton-loader';

class HistoryComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {}; //This is also a stateless component
	} //To be completed
	handleLabelSelect = (event, url, method, title, data, headers, testJson) => {
		this.props.handleHistoryClick(url, method, title);
	};
	render() {
		if (this.props.historyLoading == false) {
			if (this.props.ToSideBarHistory.length > 0) {
				let labels = this.props.ToSideBarHistory.map((requests, index) => {
					//console.log(requests);
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
					<div>
						<Skeleton count={50} color="#1b1c1d" width="100%" />
					</div>
					{/* <div className="Loader">&#8734;</div> */}
				</div>
			);
		}
	}
}

export default HistoryComponent;
