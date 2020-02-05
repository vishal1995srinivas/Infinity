import React, { Component } from "react";
import JSONInput from "react-json-editor-ajrm";

import { Icon } from "semantic-ui-react";
class TestsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: null
    };
    this.objUpdate = this.objUpdate.bind(this);
    this.clearButton = this.clearButton.bind(this);
  }
  objUpdate(arg) {
    this.props.objUpdate(arg);
  }
  clearButton() {
    this.props.objSetToNull();
  }
  render() {
    return (
      <div align="left" className="testsComponent">
        <p>
          <Icon onClick={this.clearButton} link name="close" />
        </p>
        <JSONInput
          value={this.state.obj}
          className="testsComponent"
          id="123"
          placeholder={this.props.obj}
          width="75vw"
          height="20vh"
          onChange={arg => {
            this.objUpdate(arg);
          }}
        />
      </div>
    );
  }
}

export default TestsComponent;
