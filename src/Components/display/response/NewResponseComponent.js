import React, { Component } from "react";
import { Label, Menu, Tab } from "semantic-ui-react";
import ResponseTabComponent from "./ResponseTabComponent";
import CollectionsResponseComponent from "./CollectionsResponseComponent";
import TestsComponent from "./TestsComponent";
import TestResultsComponent from "./TestResultsComponent";
import TestExampleResponse from "./TestExampleResponse";
import Display from "./testCollection/Display";
import Tests from "./Tests";

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
    let collectionsTab = null;
    let TestsTab = null;
    if (this.props.ToPlay == null) {
      collectionsTab = {};
    } else {
      collectionsTab = {
        menuItem: { key: "collections", icon: "users", content: "Collections" },
        render: () => (
          <div>
            <Tab.Pane className="tabPane">
              <Display
                requests={this.props.ToPlay.requests}
                collectionName={this.props.ToPlay.name}
              ></Display>
            </Tab.Pane>
          </div>
        )
      };
    }
    if (this.props.testCase !== null) {
      TestsTab = {
        menuItem: { key: "tests", icon: "users", content: "Tests" },
        render: () => (
          <div>
            <Tab.Pane className="tabPane">
              <Tests
                updateTestCaseToNull={this.props.updateTestCaseToNull}
                testCase={this.props.testCase}
                method={this.props.method}
                url={this.props.url}
                headers={this.props.headers}
                bodyFormOrUrlData={this.props.bodyFormOrUrlData}
              ></Tests>
            </Tab.Pane>
          </div>
        )
      };
    } else {
      TestsTab = {};
    }
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
      collectionsTab,
      TestsTab
    ];
    return (
      <div className="response">
        <Tab menu={{ inverted: true }} panes={panes} />
      </div>
    );
  }
}

export default NewResponseComponent;
