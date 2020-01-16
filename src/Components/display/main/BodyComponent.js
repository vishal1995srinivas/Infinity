import React, { Component } from "react";
import { Radio, Segment, Form } from "semantic-ui-react";

class BodyComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { value: "" };
  }
  handleChange = (e, { value }) => this.setState({ value });

  render() {
    console.log(this.state);
    const { value } = this.state;
    let anotherDiv = <div className="another"></div>;
    if (value === "none") {
      anotherDiv = <div className="another">Hit Send </div>;
    } else if (value == "form-data") {
      anotherDiv = (
        <div className="another">FormData Table for key-value pairs</div>
      );
    } else {
      anotherDiv = (
        <div className="another">form data for form-url-data-encode</div>
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
  }
}

export default BodyComponent;
