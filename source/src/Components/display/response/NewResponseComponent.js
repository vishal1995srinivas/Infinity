import React, { Component } from "react";
import { Label, Menu, Tab } from "semantic-ui-react";
import ResponseTabComponent from "./ResponseTabComponent";
import CollectionsResponseComponent from "./CollectionsResponseComponent";
import TestsComponent from "./TestsComponent";
import TestResultsComponent from "./TestResultsComponent";
import TestExampleResponse from "./TestExampleResponse";

class NewResponseComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      json: null
    };
  }
  updateResultJson = Resultjson => {
    this.setState({ json: Resultjson });
  };
  render() {
    console.log(this.props.ToPlay);
    const panes = [
      {
        menuItem: { key: "response", icon: "users", content: "Response" },
        render: () => (
          <div>
            <Tab.Pane className="tabPane">
              <ResponseTabComponent
                method={this.props.method}
                url={this.props.url}
                headers={this.props.headers}
                bodyFormOrUrlData={this.props.bodyFormOrUrlData}
              ></ResponseTabComponent>
            </Tab.Pane>
          </div>
        )
      },
      {
        menuItem: { key: "collections", icon: "users", content: "Collections" },
        render: () => (
          <div>
            <Tab.Pane className="tabPane">
              <CollectionsResponseComponent
                ToPlay={this.props.ToPlay}
                ToggleToPlayOff={this.props.ToggleToPlayOff}
              ></CollectionsResponseComponent>
            </Tab.Pane>
          </div>
        )
      },
      {
        menuItem: { key: "tests", icon: "users", content: "Tests" },
        render: () => (
          <div>
            <Tab.Pane className="tabPane">
              <TestExampleResponse
                testCase={this.props.testCase}
                method={this.props.method}
                url={this.props.url}
                headers={this.props.headers}
                bodyFormOrUrlData={this.props.bodyFormOrUrlData}
                ToPlay={this.props.ToPlay}
              ></TestExampleResponse>
            </Tab.Pane>
          </div>
        )
      }
    ];
    return (
      <div className="response">
        <Tab menu={{ inverted: true }} panes={panes} />
      </div>
    );
  }
}

export default NewResponseComponent;
