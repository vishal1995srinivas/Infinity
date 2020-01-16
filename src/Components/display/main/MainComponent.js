import React, { Component } from "react";
import QueryParamsComponent from "./QueryParamsComponent";
import UrlComponent from "./UrlComponent";
import TitleComponent from "./TitleComponent";
import TabsExample from "./TabsExample";
import InputComponents from "./InputComponents";
import MethodComponent from "./MethodComponent";
import TabsComponent from "./TabsComponent";

class MainComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="main">
        <TitleComponent></TitleComponent>
        <MethodComponent></MethodComponent>

        {/* <UrlComponent></UrlComponent> */}
        {/* <InputComponents></InputComponents> */}
        {/* <TitleComponent></TitleComponent>
        <UrlComponent></UrlComponent>
        <TabsExample></TabsExample> */}

        {/* <QueryParamsComponent></QueryParamsComponent> */}
      </div>
    );
  }
}

export default MainComponent;
