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
      method: "GET",
      url: "ValueOn Load",
      headers: [{ key: "Content/Type", value: "Application/json" }]
    };
  }
  handleSelect = (event, data) => {
    this.setState({ method: data.value });
    console.log(data.value);
  };
  handleCollectionSelect = (event, data) => {
    this.setState({ method: data.value });
    console.log(data.value);
  };
  handleUrl = event => {
    this.setState({ url: event.target.value });
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

  render() {
    const { method, url } = this.state;
    const options = [
      { key: "get", value: "GET", text: "GET" },
      { key: "post", value: "POST", text: "POST" },
      { key: "put", value: "PUT", text: "PUT" },
      { key: "delete", value: "DELETE", text: "DELETE" }
    ];
    const collections = [
      { key: "c1", text: "name1", value: "name1" },
      { key: "c2", text: "name2", value: "name2" }, //icon can be added as a keyvalue pair
      { key: "c3", text: "name3", value: "name3" }
    ];
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
          <Button primary icon labelPosition="right" className="submitBtn">
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
          />
        </div>
        <div className="tabsComponent">
          <TabsComponent
            headers={this.state.headers}
            handleHeadersKeyChange={this.handleHeadersKeyChange}
            handleHeadersValueChange={this.handleHeadersValueChange}
            method={this.state.method}
          ></TabsComponent>
        </div>
      </div>
    );
  }
}
export default MethodComponent;
