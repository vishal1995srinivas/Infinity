import React, { Component } from "react";
import Response from "./Response";
import ReactJson from "react-json-view";
var diff = require("deep-diff").diff;
class Display extends Component {
  constructor(props) {
    super(props);
    this.ClickHandler = this.ClickHandler.bind(this);
    this.HandleRequests = this.HandleRequests.bind(this);
    this.state = {
      result: [],
      requests: [
        {
          url: "https://jsonplaceholder.typicode.com/posts",
          method: "POST",
          headers: [{ "Content-Type": "application/json" }],
          bodyFormOrUrlData: { userId: 3 },
          testCase: { userId: 3 }
        },
        {
          url: "https://jsonplaceholder.typicode.com/posts",
          method: "POST",
          headers: [{ "Content-Type": "application/json" }],
          bodyFormOrUrlData: { userId: 3 },
          testCase: { id: 101 }
        }
      ],
      collectionName: null,
      collectionsRequestsLength: null
    };
  }
  ClickHandler() {
    let newResult = [];
    for (let request of this.state.requests) {
      console.log(request);
      let loading = <div>{request.url} : loading</div>;
      newResult.push(loading);
    }
    this.setState(
      {
        result: newResult,
        collectionName: this.props.collectionName,
        collectionsRequestsLength: this.props.requests.length
      },
      this.HandleRequests
    );
  }
  async HandleRequests() {
    for (let i = 0; i < this.state.requests.length; i++) {
      let result = await Response(this.state.requests[i]);
      let newResult = [...this.state.result];
      var changes = diff(this.state.requests[i].testCase, result);
      if (changes) {
        console.log(changes);
        newResult[i] = (
          <div className="response" align="left">
            <ReactJson src={changes} theme="monokai" />
          </div>
        );
      } else {
        newResult[i] = (
          <div className="response">{this.state.requests[i].url}: Success</div>
        );
      }
      this.setState({ result: newResult });
      console.log("Button is clicked");
    }
  }
  render() {
    let loading = this.state.result.map((result, index) => {
      return <div key={index}>{result}</div>;
    });
    if (this.props.requests !== null) {
      if (
        this.state.collectionName !== this.props.collectionName &&
        this.state.collectionsRequestsLength !== this.props.requests.length
      ) {
        return (
          <div>
            <button onClick={this.ClickHandler}>Click Here</button>
          </div>
        );
      } else {
        return (
          <div>
            <div>{loading}</div>
          </div>
        );
      }
    } else {
      return <div>Play Collections</div>;
    }
  }
}
export default Display;
