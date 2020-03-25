import React, { Component } from "react";
import ReactJson from "react-json-view";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import _ from "lodash";
var diff = require("deep-diff").diff;

class TestExampleResponse extends Component {
  constructor(props) {
    super(props);
    this.GetData = this.GetData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      collectionsJson: [],
      collectionName: null,
      collectionsRequestsLength: null
    };
  }
  async displayCollectionsJson() {
    let temp = [];
    for (let i = 0; i < this.props.ToPlay.requests.length; i++) {
      let myHeaders = null;
      if (this.props.ToPlay.requests[i].method == "GET") {
        if (this.props.ToPlay.requests[i].headers.length > 0) {
          myHeaders = new Headers();
          this.props.ToPlay.requests[i].headers.map(headers => {
            myHeaders.append(
              this.props.ToPlay.requests[i].headers.key,
              this.props.ToPlay.requests[i].headers.value
            );
          });
        }
        let newUrl = this.props.ToPlay.requests[i].url;
        if (this.props.ToPlay.requests[i].url.search("https://") == -1) {
          newUrl = `https://${this.props.ToPlay.requests[i].url}`;
        }
        let result = await this.GetData(
          `${newUrl}`,
          this.props.ToPlay.requests[i].method,
          myHeaders
        );
        var changes = diff(this.props.ToPlay.requests[i].testCase, result);
        if (changes) {
          console.log(changes);
          temp.push(
            <div className="response" align="left">
              <ReactJson src={changes} theme="monokai" />
            </div>
          );
        } else {
          temp.push(
            <div className="response">
              {this.props.requests[i].url}: Success
            </div>
          );
        }
        // temp.push({ result });
        if (i == this.props.ToPlay.requests.length - 1) {
          this.setState({
            collectionsJson: temp,
            collectionName: this.props.ToPlay.name,
            collectionsRequestsLength: this.props.ToPlay.requests.length
          });
        }
      } else {
        if (this.props.ToPlay.requests[i].headers.length > 0) {
          myHeaders = new Headers();
          this.props.ToPlay.requests[i].headers.map(headers => {
            myHeaders.append(
              this.props.ToPlay.requests[i].headers.key,
              this.props.ToPlay.requests[i].headers.value
            );
          });
        }
        let newUrl = this.props.ToPlay.requests[i].url;
        if (this.props.ToPlay.requests[i].url.search("https://") == -1) {
          newUrl = `https://${this.props.ToPlay.requests[i].url}`;
        }
        let result = await this.fetchData(
          `${newUrl}`,
          this.props.ToPlay.requests[i].bodyFormOrUrlData,
          this.props.ToPlay.requests[i].method,
          myHeaders
        );
        var changes = diff(this.props.ToPlay.requests[i].testCase, result);
        if (changes) {
          console.log(changes);
          temp.push(
            <div className="response" align="left">
              <ReactJson src={changes} theme="monokai" />
            </div>
          );
        } else {
          temp.push(<div className="response">Success</div>);
        }
        // temp.push(result);
        if (i == this.props.ToPlay.requests.length - 1) {
          this.setState({
            collectionsJson: temp,
            collectionName: this.props.ToPlay.name,
            collectionsRequestsLength: this.props.ToPlay.requests.length
          });
        }
      }
    }
  }
  async fetchData(url = "", data = {}, method, myHeaders) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: myHeaders,
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }
  async GetData(url = "", method, myHeaders) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: myHeaders,
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer" // no-referrer, *client
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }
  render() {
    console.log(this.props.ToPlay, this.state.collectionName);
    if (this.props.ToPlay !== null) {
      if (
        this.state.collectionName !== this.props.ToPlay.name &&
        this.state.collectionsRequestsLength !==
          this.props.ToPlay.requests.length
      ) {
        let printCollections = this.displayCollectionsJson();
        return (
          <div className="response">
            <Loader type="ThreeDots" color="black" height={100} width={100} />
          </div>
        );
      } else if (this.state.collectionsJson) {
        let collectionsJson = this.state.collectionsJson.map(
          (results, index) => {
            return (
              <div className="response" key={index}>
                {results}
              </div>
            );
          }
        );
        return (
          <div className="response" align="left">
            <div>{collectionsJson}</div>
          </div>
        );
      }
    } else {
      return <div className="response">Play Collections</div>;
    }
  }
}
export default TestExampleResponse;
