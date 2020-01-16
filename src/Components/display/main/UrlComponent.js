import React, { Component } from "react";
import M from "materialize-css";
import InputComponents from "./InputComponents";
import Dropdown from "muicss/lib/react/dropdown";
import DropdownItem from "muicss/lib/react/dropdown-item";
import Input from "muicss/lib/react/input";
class UrlComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      method: "GET",
      url: "Value on load will be this from state",
      collectionSelected: "",
      collectionsList: ["collection1", "collection2"]
    };
  }
  handleSelect = event => {
    this.setState({ method: event.target.value });
  };
  handleUrlChange = event => {
    this.setState({ url: event.target.value });
  };
  handleDropDown = event => {
    // this.setState({ collectionSelected: event.target.value });
    console.log(event.target.value);
  };
  render() {
    const { method, url, collectionsList } = this.state;

    return (
      <div className="urlComponent">
        <div className="method">
          <select
            onChange={this.handleSelect}
            className="browser-default"
            value={method}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
        <div className="url">
          <input
            onChange={this.handleUrlChange}
            type="text"
            className="urlInput"
            placeholder="Url"
            defaultValue={url}
          ></input>
        </div>
        <div className="sendButton">
          <button
            className="btn waves-effect waves-light btn-flat"
            type="submit"
            name="action"
          >
            Send
            <i className="material-icons right">send</i>
          </button>
        </div>
        <div className="dropDown">
          <select
            onChange={this.handleSelect}
            className="browser-default"
            value={method}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
      </div>
    );
  }
}

export default UrlComponent;

/* {collectionsList.map(collectionName => {
              return (
                <DropdownItem
                  value={collectionName}
                  onClick={this.handleDropDown}
                >
                  {collectionName}
                </DropdownItem>
              );
            })} */
