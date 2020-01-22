import React, { Component } from "react";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
class TestsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: { name: "Bob" }
    };
    this.objUpdate = this.objUpdate.bind(this);
  }
  objUpdate(arg) {
    this.props.objUpdate(arg);
  }
  render() {
    //console.log(this.state.obj);
    return (
      <div align="left" className="testsComponent">
        <JSONInput
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
