import React, { Component } from "react";
import TitleComponent from "./TitleComponent";
import MethodComponent from "./MethodComponent";

class MainComponent extends Component {
  constructor(props) {
    super(props);
  }
  //Actually this is a waste component.See the risks of css grid and refactor accordingly
  render() {
    return (
      <div className="main">
        <TitleComponent></TitleComponent>
        <MethodComponent
          updateStateFromSubmit={this.props.updateStateFromSubmit}
          handleSelect={this.props.handleSelect}
          handleUrl={this.props.handleUrl}
          method={this.props.method}
          url={this.props.url}
          collections={this.props.collections}
          handleSaveToCollectionName={this.props.handleSaveToCollectionName}
          SaveToCollectionName={this.props.SaveToCollectionName}
        ></MethodComponent>
      </div>
    );
  }
}
export default MainComponent;
