import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import { Table } from "semantic-ui-react";
import { Input, Button } from "semantic-ui-react";
import BodyComponent from "./BodyComponent";
import TestsComponent from "./TestsComponent";
class TabsComponent extends Component {
  constructor(props) {
    super(props);
  }
  handleHeadersKeyChange = (event, index) => {
    this.props.handleHeadersKeyChange(event, index);
  };
  handleHeadersValueChange = (event, index) => {
    this.props.handleHeadersValueChange(event, index);
  };
  render() {
    //This is a stateless component
    const panes = [
      {
        menuItem: "Headers",
        render: () => (
          <Tab.Pane inverted attached={false} className="tabPane">
            <Table inverted size="small">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Key</Table.HeaderCell>
                  <Table.HeaderCell>Values</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.headers.map((keyValuePair, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>
                        <Input
                          fluid
                          transparent
                          inverted
                          placeholder="Content-Type"
                          value={keyValuePair.key}
                          onChange={event =>
                            this.handleHeadersKeyChange(event, index)
                          }
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          fluid
                          transparent
                          inverted
                          placeholder="application/json"
                          value={keyValuePair.value}
                          onChange={event =>
                            this.handleHeadersValueChange(event, index)
                          }
                        />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </Tab.Pane>
        )
      },
      {
        menuItem: "Body",
        render: () => (
          // Do Conditional rendering as per radio buttons
          <Tab.Pane inverted attached={false}>
            <BodyComponent
              handleBodyFormKeyChange={this.props.handleBodyFormKeyChange}
              handleBodyFormValueChange={this.props.handleBodyFormValueChange}
              handleBodyFormUrlKeyChange={this.props.handleBodyFormUrlKeyChange}
              handleBodyFormUrlValueChange={
                this.props.handleBodyFormUrlValueChange
              }
              bodyFormData={this.props.bodyFormData}
              bodyFormUrlData={this.props.bodyFormUrlData}
              valueOfBody={this.props.valueOfBody}
              handleChangeValueOfBody={this.props.handleChangeValueOfBody}
              method={this.props.method}
            ></BodyComponent>
          </Tab.Pane>
        )
      },
      {
        menuItem: "Tests",
        render: () => (
          <Tab.Pane attached={false} className="tabPane">
            <TestsComponent
              objSetToNull={this.props.objSetToNull}
              objUpdate={this.props.objUpdate}
              obj={this.props.obj}
            ></TestsComponent>
          </Tab.Pane>
        )
      }
    ];
    return (
      <div className="headersTable">
        <Tab
          menu={{ inverted: true, secondary: true, pointing: true }}
          panes={panes}
        />
      </div>
    );
  }
}
export default TabsComponent;
