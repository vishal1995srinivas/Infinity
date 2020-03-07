import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import { Table } from "semantic-ui-react";
import { Input, Button } from "semantic-ui-react";

class BodyFormUrlTablesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  handleBodyFormUrlKeyChange = (event, index) => {
    this.props.handleBodyFormUrlKeyChange(event, index);
  };
  handleBodyFormUrlValueChange = (event, index) => {
    this.props.handleBodyFormUrlValueChange(event, index);
  };

  render() {
    return (
      <div className="bodyUrlTablesForm">
        <Table inverted size="small">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Key</Table.HeaderCell>
              <Table.HeaderCell>Values</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.bodyFormUrlData.map((keyValuePair, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Input
                      fluid
                      transparent
                      inverted
                      placeholder="userId"
                      value={keyValuePair.key}
                      onChange={event =>
                        this.handleBodyFormUrlKeyChange(event, index)
                      }
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Input
                      fluid
                      transparent
                      inverted
                      placeholder="3"
                      value={keyValuePair.value}
                      onChange={event =>
                        this.handleBodyFormUrlValueChange(event, index)
                      }
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default BodyFormUrlTablesComponent;
