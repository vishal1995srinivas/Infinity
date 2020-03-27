import React, { Component } from "react";
import TestResultsComponent from "./TestResultsComponent";
import TestExampleResponse from "./TestExampleResponse";
class TestsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: ""
    };
  }
  async getResults() {
    let results = [];
    let data = await (
      <TestResultsComponent
        testCase={this.props.testCase}
        method={this.props.method}
        url={this.props.url}
        headers={this.props.headers}
        bodyFormOrUrlData={this.props.bodyFormOrUrlData}
      />
    );
    results.push(data);
    return data;
  }
  render() {
    console.log(this.props.ToPlay);
    if (this.props.ToPlay !== null) {
      for (let i = 0; i < this.props.ToPlay.requests.length; i++) {
        let getResults = this.getResults(this.props.ToPlay);
        return <div>{getResults}</div>;
      }
    } else
      return (
        <div className="response">
          This will be enabled only when clicking on the Play button in
          Collections section
        </div>
      );
  }
}

export default TestsComponent;
