import React, { Component } from "react";
import { Form, Radio, Table, Segment } from "semantic-ui-react";

class BodyComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  handleChange = (e, { value }) => this.setState({ value });

  render() {
    return (
      <div align="left" className="radio">
        <Segment compact inverted size="mini">
          <Radio /> None
        </Segment>
        <Segment compact inverted size="mini">
          <Radio /> Form-data
        </Segment>
        <Segment compact inverted size="mini">
          <Radio /> Form-url-encoded
        </Segment>
        <div className="bodyTables">Hi</div>
        {/* <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Form.Field>
                  <Radio
                    label="None"
                    name="radioGroup"
                    value="none"
                    checked={this.state.value === "none"}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Form.Field>
                  <Radio
                    label="Form-data"
                    name="radioGroup"
                    value="form-data"
                    checked={this.state.value === "form-data"}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Form.Field>
                  <Radio
                    label="X-www-form-urlencoded"
                    name="radioGroup"
                    value="urlencoded"
                    checked={this.state.value === "urlencoded"}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>John Lilki</Table.Cell>
              <Table.Cell>September 14, 2013</Table.Cell>
              <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table> */}
        {/* <Radio
          label="Choose this"
          name="radioGroup"
          value="this"
          checked={this.state.value === "this"}
          onChange={this.handleChange}
        />
        <Radio
          label="Or that"
          name="radioGroup"
          value="that"
          checked={this.state.value === "that"}
          onChange={this.handleChange}
        /> */}
      </div>
    );
  }
}

export default BodyComponent;
