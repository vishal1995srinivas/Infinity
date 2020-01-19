import React, { Component } from "react";

import {
  Button,
  Select,
  Input,
  Dropdown,
  Segment,
  Icon
} from "semantic-ui-react";
import TabsComponent from "./TabsComponent";
class MethodComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headers: [{ key: "", value: "" }],
      valueOfBody: "none",
      bodyFormData: [{ key: "", value: "" }],
      bodyFormUrlData: [{ key: "", value: "" }]
    };
  }
  handleSelect = (event, data) => {
    this.props.handleSelect(event, data);
  };
  handleCollectionSelect = (event, data) => {
    // this.setState({ method: data.value });
    this.props.handleSaveToCollectionName(data.value);
    //console.log(data.value);
  };
  handleUrl = event => {
    this.props.handleUrl(event);
  };
  handleHeadersKeyChange = (event, index) => {
    this.state.headers[index].key = event.target.value;
    if (this.state.headers.length - 1 == index) {
      this.state.headers.push({ key: "", value: "" });
    }
    this.setState({ headers: this.state.headers });
  };
  handleHeadersValueChange = (event, index) => {
    this.state.headers[index].value = event.target.value;
    this.setState({ headers: this.state.headers });
  };
  handleBodyFormKeyChange = (event, index) => {
    this.state.bodyFormData[index].key = event.target.value;
    if (this.state.bodyFormData.length - 1 == index) {
      this.state.bodyFormData.push({ key: "", value: "" });
    }
    this.setState({ bodyFormData: this.state.bodyFormData });
  };
  handleBodyFormValueChange = (event, index) => {
    this.state.bodyFormData[index].value = event.target.value;
    this.setState({ bodyFormData: this.state.bodyFormData });
  };
  handleBodyFormUrlKeyChange = (event, index) => {
    this.state.bodyFormUrlData[index].key = event.target.value;
    if (this.state.bodyFormUrlData.length - 1 == index) {
      this.state.bodyFormUrlData.push({ key: "", value: "" });
    }
    this.setState({ headers: this.state.headers });
  };
  handleBodyFormUrlValueChange = (event, index) => {
    this.state.bodyFormUrlData[index].value = event.target.value;
    this.setState({ bodyFormUrlData: this.state.bodyFormUrlData });
  };
  handleChangeValueOfBody = valueOfBody => {
    if (valueOfBody === "none") {
      this.setState({
        valueOfBody: valueOfBody,
        bodyFormData: [{ key: "", value: "" }],
        bodyFormUrlData: [{ key: "", value: "" }]
      });
    } else if (valueOfBody === "form-data") {
      let headers = [...this.state.headers];
      headers = [
        { key: "Content-Type", value: "multipart/form-data" },
        headers
      ];
      this.setState({
        headers: headers,
        valueOfBody: valueOfBody,
        bodyFormUrlData: [{ key: "", value: "" }]
      });
    } else if (valueOfBody === "Form-url-encoded") {
      let headers = [...this.state.headers];
      headers = [
        { key: "Content-Type", value: "application/x-www-form-urlencoded" },
        headers
      ];
      this.setState({
        headers: headers,
        valueOfBody: valueOfBody,
        bodyFormData: [{ key: "", value: "" }]
      });
    }
  };
  SubmitHandler = () => {
    if (this.props.url !== null || this.props.url !== "") {
      if (this.props.method == "GET") {
        console.log("Method is", this.props.method); // method
        console.log("URL is", this.props.url); // url
        let headers = [...this.state.headers];
        let headersLength = headers.length;
        let newHeaders = headers.slice(0, headersLength - 1);
        console.log("Headers are", newHeaders); //headers
        this.props.updateStateFromSubmit(
          this.props.method,
          this.props.url,
          newHeaders,
          null //no body in get
        );
      } else {
        //console.log("Method is", this.props.method); // method
        //console.log("URL is", this.props.url); // url
        let headers = [...this.state.headers];
        let headersLength = headers.length;
        let newHeaders = headers.slice(0, headersLength - 1);

        let bodyFormData = [...this.state.bodyFormData];
        let bodyFormDataLength = bodyFormData.length;
        let newBodyFormData = bodyFormData.slice(0, bodyFormDataLength - 1);

        if (this.state.valueOfBody == "form-data") {
          this.props.updateStateFromSubmit(
            this.props.method,
            this.props.url,
            newHeaders,
            newBodyFormData //body in other than get
          );
        } else if (this.state.valueOfBody == "Form-url-encoded") {
          let headers = [...this.state.headers];
          let headersLength = headers.length;
          let newHeaders = headers.slice(0, headersLength - 1);

          let bodyFormUrlData = [...this.state.bodyFormUrlData];
          let bodyFormUrlDataLength = bodyFormUrlData.length;
          let newBodyFormUrlData = bodyFormUrlData.slice(
            0,
            bodyFormUrlDataLength - 1
          );
          this.props.updateStateFromSubmit(
            this.props.method,
            this.props.url,
            newHeaders,
            newBodyFormUrlData //body in other than get
          );
        } else {
          let headers = [...this.state.headers];
          let headersLength = headers.length;
          let newHeaders = headers.slice(0, headersLength - 1);
          this.props.updateStateFromSubmit(
            this.props.method,
            this.props.url,
            newHeaders,
            null //body in other than get
          );
        }
      }
    } else {
      alert("URL cannot be empty");
    }
  };
  render() {
    //console.log(this.props.method);
    // console.log("this is body form", this.state.bodyFormData);
    // console.log("This is body url", this.state.bodyFormUrlData);
    const { method, url } = this.props;
    const options = [
      { key: "get", value: "GET", text: "GET" },
      { key: "post", value: "POST", text: "POST" },
      { key: "put", value: "PUT", text: "PUT" },
      { key: "delete", value: "DELETE", text: "DELETE" }
    ];
    const collections = this.props.collections.map((collection, index) => {
      return { key: index, text: collection.name, value: collection.name };
    });
    // const collections = [
    //   { key: "c1", text: "name1", value: "name1" },
    //   { key: "c2", text: "name2", value: "name2" },
    //   { key: "c3", text: "name3", value: "name3" }
    // ];
    return (
      //This has to be refactored-> create a new component for only method,url,submit and save buttons
      <div className="urlComponent">
        <div className="method">
          <Select
            fluid
            value={method}
            options={options}
            className="selectTag"
            onChange={this.handleSelect}
          />
        </div>
        <div className="url">
          <Input
            transparent
            fluid
            inverted
            icon="globe"
            iconPosition="left"
            placeholder="URL here"
            className="inputUrl"
            value={url}
            onChange={this.handleUrl}
          />
        </div>
        <div className="sendButton">
          <Button
            primary
            icon
            labelPosition="right"
            className="submitBtn"
            onClick={this.SubmitHandler}
          >
            Send
            <Icon name="send" />
          </Button>
        </div>
        <div className="saveButton">
          <Select
            fluid
            placeholder="Save"
            options={collections}
            className="selectTag"
            onChange={this.handleCollectionSelect}
            value={this.props.SaveToCollectionName}
          />
        </div>
        <div className="tabsComponent">
          <TabsComponent
            headers={this.state.headers}
            handleHeadersKeyChange={this.handleHeadersKeyChange}
            handleHeadersValueChange={this.handleHeadersValueChange}
            method={this.props.method}
            handleBodyFormKeyChange={this.handleBodyFormKeyChange}
            handleBodyFormValueChange={this.handleBodyFormValueChange}
            handleBodyFormUrlKeyChange={this.handleBodyFormUrlKeyChange}
            handleBodyFormUrlValueChange={this.handleBodyFormUrlValueChange}
            bodyFormData={this.state.bodyFormData}
            bodyFormUrlData={this.state.bodyFormUrlData}
            valueOfBody={this.state.valueOfBody}
            handleChangeValueOfBody={this.handleChangeValueOfBody}
          ></TabsComponent>
        </div>
      </div>
    );
  }
}
export default MethodComponent;
