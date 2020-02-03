import React, { Component } from "react";
import Response from "./Response";
import ReactJson from "react-json-view";
import { Icon, Button } from "semantic-ui-react";
import { withAlert } from "react-alert";
var diff = require("deep-diff").diff;
class Display extends Component {
  constructor(props) {
    super(props);
    const alert = this.props.alert;
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
      let loading = (
        <div>
          {request.url} : <Icon loading name="asterisk" inverted />
        </div>
      );
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
        try {
          let result = await Response(this.props.ToPlay.requests[i]);
          if (this.props.ToPlay.requests[i].testCase !== null) {
            let changes = diff(result, this.props.ToPlay.requests[i].testCase);
            if (changes) {
              console.log(changes);
              newResult[i] = (
                <div className="response" align="left">
                  <ReactJson src={changes} theme="monokai" />
                </div>
              );
            } else {
              let successJson = {
                TestCase: "Matched",
                Operation: "Success"
              };
              newResult[i] = (
                <div className="response" align="left">
                  <ReactJson src={successJson} theme="monokai" />
                </div>
              );
            }
            this.setState({ result: newResult });
          } else {
            newResult[i] = (
              <div className="response" align="left">
                <ReactJson src={result} theme="monokai" />
              </div>
            );
            this.setState({ result: newResult });
          }
        } catch (error) {
          console.log(error);
          let errorJson = {
            Error: `${error}, Message : ${error.message}`
          };
          newResult[i] = (
            <div className="response" align="left">
              <ReactJson src={errorJson} theme="monokai" />
            </div>
          );
        }
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
          <Button onClick={this.ClickHandler} secondary>
            Click Here to get Test Results
          </Button>
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
export default withAlert()(Display);
