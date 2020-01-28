import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import HistoryComponent from "./HistoryComponent";
import CollectionsComponent from "./CollectionsComponent";

class SidebarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const panes = [
      {
        menuItem: "History",
        render: () => (
          <Tab.Pane attached={false} className="tabPane">
            <HistoryComponent
              ToSideBarHistory={this.props.ToSideBarHistory}
              handleHistoryClick={this.props.handleHistoryClick}
            ></HistoryComponent>
          </Tab.Pane>
        )
      },
      {
        menuItem: "Collections",
        render: () => (
          <Tab.Pane attached={false} className="tabPane">
            <CollectionsComponent
              handleCollectionName={this.props.handleCollectionName}
              collectionName={this.props.collectionName}
              handleCreateCollection={this.props.handleCreateCollection}
              collections={this.props.collections}
              handleDeleteCollection={this.props.handleDeleteCollection}
              handlePlayCollection={this.props.handlePlayCollection}
            ></CollectionsComponent>
          </Tab.Pane>
        )
      }
    ];
    return (
      <div className="sidebar">
        <Tab menu={{ inverted: true, pointing: true }} panes={panes} />
      </div>
    );
  }
}

export default SidebarComponent;
