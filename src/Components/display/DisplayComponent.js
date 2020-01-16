import React, { Component } from "react";
import MainComponent from "./main/MainComponent";
import SidebarComponent from "./sidebar/SidebarComponent";
import ResponseComponent from "./response/ResponseComponent";
class DisplayComponent extends Component {
  render() {
    return (
      <div className="display">
        <MainComponent></MainComponent>
        <SidebarComponent></SidebarComponent>
        <ResponseComponent></ResponseComponent>
      </div>
    );
  }
}

export default DisplayComponent;
