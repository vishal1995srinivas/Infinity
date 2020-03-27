import React, { Component } from 'react';
import Tests from './Tests';
import ResponseTabComponent from './ResponseTabComponent';
import DisplayReplica from './testCollection/DisplayReplica';
class AllResponse extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		if (this.props.sendSwitch == true) {
			if (this.props.testCase !== null) {
				return (
					<div className="response">
						<Tests
							testCase={this.props.testCase}
							method={this.props.method}
							url={this.props.url}
							headers={this.props.headers}
							bodyFormOrUrlData={this.props.bodyFormOrUrlData}
							SendLoadingSwitch={this.props.SendLoadingSwitch}
						/>
					</div>
				);
			} else {
				return (
					<div className="response">
						<ResponseTabComponent
							method={this.props.method}
							url={this.props.url}
							headers={this.props.headers}
							bodyFormOrUrlData={this.props.bodyFormOrUrlData}
							SendLoadingSwitch={this.props.SendLoadingSwitch}
						/>
					</div>
				);
			}
		} else {
			console.log(this.props.ToPlay);
			return (
				<div className="response">
					<DisplayReplica ToPlay={this.props.ToPlay} />
				</div>
			);
		}
	}
}
export default AllResponse;
