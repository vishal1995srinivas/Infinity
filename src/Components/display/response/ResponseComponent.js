import React, { Component } from "react";
import ReactJson from "react-json-view";

class ResponseComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: "",
      urlString: "",
      error: "",
      JsonData: "",
      headers: [{}],
      method: "",
      bodyFormOrUrlData: [{}]
    };
  }
  async fetchfunction() {
    if (this.props.method == "GET") {
      // console.log(headers);
      let myHeaders = new Headers();
      this.props.headers.map(headers => {
        myHeaders.append(headers.key, headers.value);
      });
      this.GetData(`${this.props.url}`, this.props.method, myHeaders)
        .then(data => {
          this.setState({
            JsonData: data,
            urlString: this.props.url,
            method: this.props.method,
            headers: this.props.headers,
            bodyFormOrUrlData: this.props.bodyFormOrUrlData
          });
          console.log(data); // JSON data parsed by `response.json()` call
        })
        .catch(error => {
          console.log(error);
          this.setState({ JsonData: error, urlString: this.props.url });
        });
    } else {
      let myHeaders = new Headers();
      this.props.headers.map(headers => {
        myHeaders.append(headers.key, headers.value);
      });
      this.fetchData(
        `${this.props.url}`,
        this.props.bodyFormOrUrlData,
        this.props.method,
        myHeaders
      )
        .then(data => {
          this.setState({
            JsonData: data,
            urlString: this.props.url,
            method: this.props.method,
            headers: this.props.headers,
            bodyFormOrUrlData: this.props.bodyFormOrUrlData
          });
          console.log(this.state.JsonData); // JSON data parsed by `response.json()` call
        })
        .catch(error => {
          console.log(error);
          this.setState({ JsonData: error, urlString: this.props.url });
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
    console.log(this.props.bodyFormOrUrlData);
    const { url } = this.props;
    const {
      isLoading,
      error,
      JsonData,
      urlString,
      method,
      headers,
      bodyFormOrUrlData
    } = this.state;
    if (url == "") {
      return <div className="response">Hit Send to fetch data</div>;
    } else if (
      urlString !== url ||
      method !== this.props.method ||
      headers !== this.props.headers ||
      bodyFormOrUrlData !== this.props.bodyFormOrUrlData
    ) {
      let fetchData = this.fetchfunction();
      return (
        <div className="response">
          <h1>Loading...</h1>
        </div>
      );
    } else {
      let str = JSON.stringify(JsonData);
      str = JSON.stringify(JsonData, null, 2);
      return (
        <div className="response" align="left">
          <ReactJson src={JsonData} theme="monokai" />
          {/* <pre>
            <code>{str}</code>
          </pre> */}
        </div>
      );
    }
    //return <div className="response">response</div>;
  }
}

export default ResponseComponent;
