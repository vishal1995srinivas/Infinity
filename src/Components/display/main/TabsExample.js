import React from "react";
import Tabs from "muicss/lib/react/tabs";
import Tab from "muicss/lib/react/tab";

class TabsExample extends React.Component {
  onChange(i, value, tab, ev) {
    console.log(i, value, tab, ev);
  }

  onActive(tab) {
    console.log("This is active tab", tab);
  }

  render() {
    return (
      <Tabs
        onChange={this.onChange}
        defaultSelectedIndex={0}
        className="mui-tabs"
      >
        <Tab value="pane-1" label="Tab 1" onActive={this.onActive} href="#">
          Pane-1
        </Tab>
        <Tab value="pane-2" label="Tab 2">
          Pane-2
        </Tab>
      </Tabs>
    );
  }
}
export default TabsExample;
