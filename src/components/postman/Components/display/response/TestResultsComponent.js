import React, { Component } from "react";
import ReactJson from "react-json-view";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import _ from "lodash";

var diff = require("deep-diff").diff;
class TestResultsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: "",
      urlString: "",
      error: "",
      JsonData: "",
      headers: [{}],
      method: "",
      bodyFormOrUrlData: [{}],
      collectionJson: null,
      collectionName: null
    };
  }
  async fetchfunction(method, headers, url, bodyFormOrUrlData) {
    let myHeaders = null;
    if (method == "GET") {
      // console.log(headers);
      if (headers.length > 0) {
        myHeaders = new Headers();
        headers.map(headers => {
          myHeaders.append(headers.key, headers.value);
        });
      }
      let newUrl = url;
      if (url.search("https://") == -1) {
        newUrl = `https://${this.props.url}`;
      }
      this.GetData(`${newUrl}`, method, myHeaders)
        .then(data => {
          console.log("This is inside Response", data);
          this.setState({
            JsonData: data,
            urlString: url,
            method: method,
            headers: headers,
            bodyFormOrUrlData: bodyFormOrUrlData
          });
        })
        .catch(error => {
          console.log(error.message);
          this.setState({ error: error, urlString: newUrl });
        });
    } else {
      if (headers.length > 0) {
        myHeaders = new Headers();
        headers.map(headers => {
          myHeaders.append(headers.key, headers.value);
        });
      }
      let newUrl = url;
      if (url.search("https://") == -1) {
        newUrl = `https://${url}`;
      }
      this.fetchData(`${newUrl}`, bodyFormOrUrlData, method, myHeaders)
        .then(data => {
          console.log("This is inside Response", data);
          this.setState({
            JsonData: data,
            urlString: url,
            method: method,
            headers: headers,
            bodyFormOrUrlData: bodyFormOrUrlData
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({ error: error, urlString: this.props.url });
        });
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
    //console.log(object);
    console.log(
      "This is inside testResults",
      this.state.JsonData,
      this.props.testCase
    );
    const { url, testCase } = this.props;
    const {
      isLoading,
      error,
      JsonData,
      urlString,
      method,
      headers,
      bodyFormOrUrlData
    } = this.state;
    if (testCase == null) {
      return <div className="response">No Test Cases Found</div>;
    } else if (
      urlString !== url ||
      method !== this.props.method ||
      headers !== this.props.headers ||
      bodyFormOrUrlData !== this.props.bodyFormOrUrlData
    ) {
      let fetchData = this.fetchfunction(
        this.props.method,
        this.props.headers,
        this.props.url,
        this.props.bodyFormOrUrlData
      );
      return (
        <div className="response">
          <Loader type="ThreeDots" color="black" height={100} width={100} />
        </div>
      );
    } else if (this.state.JsonData) {
      // if (this.props.testCase) {
      var changes = diff(this.props.testCase, this.state.JsonData);
      if (changes) {
        console.log(changes);
        return (
          <div className="response" align="left">
            <ReactJson src={changes} theme="monokai" />
          </div>
        );
      } else {
        return <div className="response">Success</div>;
      }
    } else {
      return <div className="response">{this.state.error}</div>;
    }
  }
}

export default TestResultsComponent;
