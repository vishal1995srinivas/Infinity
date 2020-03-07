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
