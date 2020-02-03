import React, { Component } from "react";
import MainComponent from "./main/MainComponent";
import SidebarComponent from "./sidebar/SidebarComponent";

import { withAlert } from "react-alert";
import AllResponse from "./response/AllResponse";
class DisplayComponent extends Component {
  constructor(props) {
    super(props);
    const alert = this.props.alert;
    this.state = {
      method: "GET",
      url: "",
      headers: [{ key: "", value: "" }],
      bodyFormOrUrlData: [{ key: "", value: "" }],
      ToResponseMethod: "",
      ToResponseUrl: "",
      ToResponseHeaders: [{ key: "", value: "" }],
      ToResponseBodyFormOrUrlData: [{ key: "", value: "" }],
      ToSideBarHistory: [],
      collectionName: "",
      collections: [],
      SaveToCollectionName: null,
      ToPlay: null,
      testCase: null,
      sendSwitch: true
    };
  }
  updateTestCaseToNull = () => {
    this.setState({ testCase: null });
  };
  updateStateFromSubmit = (
    method,
    url,
    headers,
    bodyFormOrUrlData,
    testJson
  ) => {
    if (url !== "") {
      if (headers.length > 0) {
        if (this.state.SaveToCollectionName !== null) {
          this.state.collections.map(collection => {
            if (collection.name == this.state.SaveToCollectionName) {
              collection.requests.push({
                method: method,
                url: url,
                headers: headers,
                bodyFormOrUrlData: bodyFormOrUrlData,
                testCase: testJson
              });
              this.props.alert.success(
                `Successfully saved to ${this.state.SaveToCollectionName} Collection`
              );
            }
          });
        }
        this.state.ToSideBarHistory.push({ method: method, url: url });
        this.setState({
          ToResponseMethod: method,
          ToResponseUrl: url,
          ToResponseHeaders: headers,
          ToResponseBodyFormOrUrlData: bodyFormOrUrlData,
          ToSideBarHistory: this.state.ToSideBarHistory,
          testCase: testJson,
          sendSwitch: true
        });
      } else {
        if (
          this.state.SaveToCollectionName !== null &&
          this.state.SaveToCollectionName !== ""
        ) {
          let newHeaders = [{ key: "Content-Type", value: "application/json" }];
          this.state.collections.map(collection => {
            if (collection.name == this.state.SaveToCollectionName) {
              collection.requests.push({
                method: method,
                url: url,
                headers: newHeaders,
                bodyFormOrUrlData: bodyFormOrUrlData,
                testCase: testJson
              });
              this.props.alert.success(
                `Successfully saved to ${this.state.SaveToCollectionName} Collection`
              );
            }
          });
          this.state.ToSideBarHistory.push({ method: method, url: url });
          this.setState({
            ToSideBarHistory: this.state.ToSideBarHistory,
            testCase: testJson,
            sendSwitch: true,
            ToResponseMethod: method,
            ToResponseUrl: url,
            ToResponseHeaders: [
              { key: "Content-Type", value: "application/json" }
            ],
            ToResponseBodyFormOrUrlData: bodyFormOrUrlData
          });
        } else {
          this.state.ToSideBarHistory.push({ method: method, url: url });
          this.setState({
            ToResponseMethod: method,
            ToResponseUrl: url,
            ToResponseHeaders: [
              { key: "Content-Type", value: "application/json" }
            ],
            ToResponseBodyFormOrUrlData: bodyFormOrUrlData,
            ToSideBarHistory: this.state.ToSideBarHistory,
            testCase: testJson,
            sendSwitch: true
          });
        }
      }
    } else {
      this.props.alert.error("URL is empty.");
    }
  };
  handleSaveToCollectionName = value => {
    this.setState({ SaveToCollectionName: value });
  };
  handleSelect = (event, data) => {
    this.setState({ method: data.value });
  };
  handleUrl = event => {
    this.setState({ url: event.target.value });
  };
  handleHistoryClick = (url, method) => {
    this.setState({ method: method, url: url });
  };
  handleCollectionName = value => {
    this.setState({ collectionName: value });
  };
  handleCreateCollection = event => {
    let collectionExist = false;
    if (this.state.collectionName !== "") {
      this.state.collections.map(collection => {
        if (collection.name == this.state.collectionName) {
          this.props.alert.error(`${this.state.collectionName} already exists`);
          collectionExist = true;
        }
      });
      if (collectionExist == false) {
        let newCollection = [
          ...this.state.collections,
          {
            name: this.state.collectionName,
            requests: []
          }
        ];
        this.setState({ collections: newCollection, collectionName: "" });
        this.props.alert.success(
          `Collection ${this.state.collectionName}  Created successfully`
        );
      }
    } else {
      this.props.alert.error("Collection Name cannot be empty");
    }
  };
  handleDeleteCollection = (event, index) => {
    let newCollections = [...this.state.collections];
    newCollections.splice(index, 1);
    this.setState({ collections: newCollections });
    this.props.alert.success("Collection Deleted Successfully");
  };
  handlePlayCollection = index => {
    this.setState({ ToPlay: this.state.collections[index], sendSwitch: false });
  };
  ToggleToPlayOff = () => {
    this.setState({ ToPlay: null });
  };
  render() {
    return (
      <div className="display">
        <MainComponent
          updateStateFromSubmit={this.updateStateFromSubmit}
          handleSelect={this.handleSelect}
          handleUrl={this.handleUrl}
          method={this.state.method}
          url={this.state.url}
          collections={this.state.collections}
          handleSaveToCollectionName={this.handleSaveToCollectionName}
          SaveToCollectionName={this.SaveToCollectionName}
        ></MainComponent>
        <SidebarComponent
          ToSideBarHistory={this.state.ToSideBarHistory}
          handleHistoryClick={this.handleHistoryClick}
          handleCollectionName={this.handleCollectionName}
          collectionName={this.state.collectionName}
          handleCreateCollection={this.handleCreateCollection}
          collections={this.state.collections}
          handleDeleteCollection={this.handleDeleteCollection}
          handlePlayCollection={this.handlePlayCollection}
        ></SidebarComponent>
        <AllResponse
          sendSwitch={this.state.sendSwitch}
          method={this.state.ToResponseMethod}
          url={this.state.ToResponseUrl}
          headers={this.state.ToResponseHeaders}
          bodyFormOrUrlData={this.state.ToResponseBodyFormOrUrlData}
          ToPlay={this.state.ToPlay}
          ToggleToPlayOff={this.ToggleToPlayOff}
          testCase={this.state.testCase}
          updateTestCaseToNull={this.updateTestCaseToNull}
        ></AllResponse>
      </div>
    );
  }
}

export default withAlert()(DisplayComponent);
