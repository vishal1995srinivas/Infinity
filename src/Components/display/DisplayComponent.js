import React, { Component } from "react";
import MainComponent from "./main/MainComponent";
import SidebarComponent from "./sidebar/SidebarComponent";
import ResponseComponent from "./response/ResponseComponent";
class DisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      method: "GET",
      url: "",
      headers: [{ key: "", value: "" }],
      bodyFormOrUrlData: [{ key: "", value: "" }],
      ToResponseMethod: "GET",
      ToResponseUrl: "",
      ToResponseHeaders: [{ key: "", value: "" }],
      ToResponseBodyFormOrUrlData: [{ key: "", value: "" }]
    };
  }
  updateStateFromSubmit = (method, url, headers, bodyFormOrUrlData) => {
    //console.log(method, url, headers, bodyFormOrUrlData);
    this.setState({
      ToResponseMethod: method,
      ToResponseUrl: url,
      ToResponseHeaders: headers,
      ToResponseBodyFormOrUrlData: bodyFormOrUrlData
    });
  };
  handleSelect = (event, data) => {
    this.setState({ method: data.value });
    console.log(data.value);
  };
  handleUrl = event => {
    this.setState({ url: event.target.value });
  };
  render() {
    return (
      <div className="display">
        <MainComponent
          updateStateFromSubmit={this.updateStateFromSubmit}
          handleSelect={this.handleSelect}
          handleUrl={this.handleUrl}
          method={this.state.method}
          url={this.state.url}
        ></MainComponent>
        <SidebarComponent></SidebarComponent>
        <ResponseComponent
          method={this.state.ToResponseMethod}
          url={this.state.ToResponseUrl}
          headers={this.state.ToResponseHeaders}
          bodyFormOrUrlData={this.state.ToResponseBodyFormOrUrlData}
        ></ResponseComponent>
      </div>
    );
  }
}

export default DisplayComponent;
