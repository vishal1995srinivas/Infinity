import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import { Accordion, Icon, Segment, Label, Button, Input } from 'semantic-ui-react';

class CollectionsComponent extends Component {
	constructor(props) {
		super(props);
		const alert = this.props.alert;

		this.state = {
			activeIndex: 0
		};
	}
	handleClick = (e, titleProps) => {
		const { index } = titleProps;
		const { activeIndex } = this.state;
		const newIndex = activeIndex === index ? -1 : index;

		this.setState({ activeIndex: newIndex });
	};
	handlePlay = (event, index) => {
		// console.log(collectionId)
		this.props.handlePlayCollection(index);
		//console.log(this.state.collections[index]);
	};
	handleDelete = (event, index) => {
		this.props.handleDeleteCollection(event, index);
	};
	handleCollectionName = (event) => {
		this.props.handleCollectionName(event.target.value);
	};
	handleCreateCollection = (event) => {
		this.props.handleCreateCollection();
	};

	render() {
		const { activeIndex } = this.state;
		//console.log(this.props.collections)
		if (this.props.collections.length > 0) {
			let result = this.props.collections.map((collections, index) => {
				//console.log(collections);
				if (collections.requests.length > 0) {
					let labels = collections.requests.map((requests, index) => {
						if (requests !== null) {
							let title = null;
							if (requests.title == '' || requests.title == null) {
								title = requests.url;
							} else {
								title = requests.title;
							}
							if (requests.method == 'GET') {
								return (
									<div className="label" key={index}>
										<Label as="a" color="green" size="mini">
											{title}
											<Label.Detail>{requests.method}</Label.Detail>
										</Label>
									</div>
								);
							} else if (requests.method == 'POST') {
								return (
									<div className="label" key={index}>
										<Label as="a" color="yellow" size="mini">
											{title}
											<Label.Detail>{requests.method}</Label.Detail>
										</Label>
									</div>
								);
							} else if (requests.method == 'PUT') {
								return (
									<div key={requests._id} className="label">
										<Label as="a" color="blue" size="mini">
											{title}
											<Label.Detail>{requests.method}</Label.Detail>
										</Label>
									</div>
								);
							} else if (requests.method == 'DELETE') {
								return (
									<div className="label" key={index}>
										<Label as="a" color="red" size="mini">
											{title}
											<Label.Detail>{requests.method}</Label.Detail>
										</Label>
									</div>
								);
							}
						}
					});
					return (
						<div className="collections" align="left" key={index}>
							<Segment inverted>
								<Accordion fluid inverted>
									<Accordion.Title
										active={activeIndex === { index }}
										index={index}
										onClick={this.handleClick}
									>
										<Icon name="dropdown" />
										{collections.collectionName}
										<a href="#">
											<Icon
												className="iconPlay" //Create a separate classname in css as same as play
												name="trash"
												onClick={(event) => this.handleDelete(event, index)}
											/>
										</a>
										<a href="#">
											<Icon
												className="iconPlay"
												name="play"
												onClick={(event) => this.handlePlay(event, index)}
											/>
										</a>
									</Accordion.Title>
									<Accordion.Content active={activeIndex === index}>{labels}</Accordion.Content>
								</Accordion>
							</Segment>
						</div>
					);
				} else {
					return (
						<div className="collections" align="left" key={index}>
							<Segment inverted>
								<Accordion fluid inverted>
									<Accordion.Title
										active={activeIndex === { index }}
										index={index}
										onClick={this.handleClick}
									>
										<Icon name="dropdown" />
										{collections.collectionName}

										<a href="#">
											<Icon
												className="iconPlay" //Create a separate classname in css as same as play
												name="trash"
												onClick={(event) => this.handleDelete(event, index)}
											/>
										</a>
									</Accordion.Title>
									<Accordion.Content active={activeIndex === index}>
										<p>No Requests in the collection.</p>
									</Accordion.Content>
								</Accordion>
							</Segment>
						</div>
					);
				}
			});
			return (
				<div className="collections">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							this.handleCreateCollection();
						}}
					>
						<div className="inputCollection">
							<Input
								transparent
								fluid
								inverted
								icon="folder"
								iconPosition="left"
								placeholder="New Collection Name + Enter"
								onChange={this.handleCollectionName}
								value={this.props.collectionName}
							/>
						</div>
					</form>

					{result}
				</div>
			);
		} else {
			return (
				<div className="collections">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							this.handleCreateCollection();
						}}
					>
						<div className="inputCollection">
							<Input
								transparent
								fluid
								inverted
								icon="folder"
								iconPosition="left"
								placeholder="New Collection Name + Enter"
								onChange={this.handleCollectionName}
								value={this.props.collectionName}
							/>
						</div>
					</form>
				</div>
			);
		}
	}
}

export default withAlert()(CollectionsComponent);
