import React, { Component } from "react";
import { Radio, Segment, Form } from "semantic-ui-react";
import BodyFormTablesComponent from "./BodyFormTablesComponent";
import BodyFormUrlTablesComponent from "./BodyFormUrlTablesComponent";
import NoneComponent from "./NoneComponent";

class BodyComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { value: "none" };
  }
  handleChange = (e, { value }) => {
    // if (this.props.valueOfBody !== this.state.value) {
    //   this.props.handleChangeValueOfBody(this.state.value);
    // }
    this.props.handleChangeValueOfBody(value);
    this.setState({ value });
  };
  //this.props.handleChangeValueOfBody(value);
  render() {
    if (this.props.method !== "GET") {
      const { value } = this.state;
      let anotherDiv = <div className="another"></div>;
      if (value === "none") {
        anotherDiv = (
          <div className="another">
            <NoneComponent></NoneComponent>
          </div>
        );
      } else if (value == "form-data") {
        anotherDiv = (
          <div className="another">
            <BodyFormTablesComponent
              handleBodyFormKeyChange={this.props.handleBodyFormKeyChange}
              handleBodyFormValueChange={this.props.handleBodyFormValueChange}
              bodyFormData={this.props.bodyFormData}
            ></BodyFormTablesComponent>
          </div>
        );
      } else {
        anotherDiv = (
          <div className="another">
            <BodyFormUrlTablesComponent
              handleBodyFormUrlKeyChange={this.props.handleBodyFormUrlKeyChange}
              handleBodyFormUrlValueChange={
                this.props.handleBodyFormUrlValueChange
              }
              bodyFormUrlData={this.props.bodyFormUrlData}
            ></BodyFormUrlTablesComponent>
          </div>
        );
      }
      return (
        <div className="body">
          <div className="radioButtons">
            <Form>
              <Form.Field>
                <Segment compact inverted size="mini">
                  <Radio
                    name="radioGroup"
                    value="none"
                    checked={this.state.value === "none"}
                    onChange={this.handleChange}
                  />
                  None
                </Segment>
              </Form.Field>
              <Form.Field>
                <Segment compact inverted size="mini">
                  <Radio
                    name="radioGroup"
                    value="form-data"
                    checked={this.state.value === "form-data"}
                    onChange={this.handleChange}
                  />
                  Form-data
                </Segment>
                <Segment compact inverted size="mini">
                  <Radio
                    name="radioGroup"
                    value="Form-url-encoded"
                    checked={this.state.value === "Form-url-encoded"}
                    onChange={this.handleChange}
                  />
                  Form-url-encoded
                </Segment>
              </Form.Field>
            </Form>
          </div>
          {anotherDiv}
        </div>
      );
    } else {
      return <div className="another">No Body in GET Requests</div>;
    }
  }
}

export default BodyComponent;
