import React, { Component } from "react";
import Response from "./Response";
import ReactJson from "react-json-view";
import responseInOne from "./responseInOne";
var diff = require("deep-diff").diff;
class Display extends Component {
  constructor(props) {
    super(props);
    this.ClickHandler = this.ClickHandler.bind(this);
    this.state = {
      result: [],
      requests: [
        {
          url: "https://jsonplaceholder.typicode.com/posts",
          method: "POST",
          headers: [{ key: "Content-Type", value: "application/json" }],
          bodyFormOrUrlData: { userId: 3 },
          testCase: { userId: 3 }
        },
        {
          url: "https://jsonplaceholder.typicode.com/posts",
          method: "POST",
          headers: [{ key: "Content-Type", value: "application/json" }],
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
    for (let request of this.props.ToPlay.requests) {
      console.log(request);
      let loading = <div>{request.url} : loading</div>;
      newResult.push(loading);
    }
    this.setState(
      {
        result: newResult,
        collectionName: this.props.collectionName,
        collectionsRequestsLength: this.props.ToPlay.requests.length
      },
      HandleRequests
    );

    async function HandleRequests() {
      for (let i = 0; i < this.props.ToPlay.requests.length; i++) {
        let result = await Response(this.props.ToPlay.requests[i]);
        let changes = diff(result, this.props.ToPlay.requests[i].testCase);
        if (changes) {
          console.log(changes);
          newResult[i] = (
            <div className="response" align="left">
              <ReactJson src={changes} theme="monokai" />
            </div>
          );
        } else {
          newResult[i] = (
            <div className="response">
              {this.state.requests[i].url}: Test Case Matched Successfully
            </div>
          );
        }
        this.setState({ result: newResult });
      }
    }
  }

  render() {
    if (
      this.state.collectionName !== this.props.collectionName &&
      this.state.collectionsRequestsLength !== this.props.ToPlay.requests.length
    ) {
      return (
        <div>
          <button onClick={this.ClickHandler}>Click Here</button>
        </div>
      );
    } else {
      let loading = this.state.result.map((result, index) => {
        return <div key={index}>{result}</div>;
      });
      return (
        <div className="response" align="left">
          <div>{loading}</div>
        </div>
      );
    }
  }
}
export default Display;
