import React, { Component } from "react";
import MainComponent from "./main/MainComponent";
import SidebarComponent from "./sidebar/SidebarComponent";
import ResponseComponent from "./response/ResponseComponent";
import NewResponseComponent from "./response/NewResponseComponent";
import ResponseTabComponent from "./response/ResponseTabComponent";
import { withAlert } from "react-alert";
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
      collections: [
        {
          name: "Sample",
          requests: [
            {
              method: "POST",
              url: "https://jsonplaceholder.typicode.com/posts",
              headers: [{ key: "Content/Type", value: "application/json" }],
              bodyFormOrUrlData: [{ key: "userId", value: "3" }],
              testCase: { id: 101 }
            },
            {
              method: "POST",
              url: "https://jsonplaceholder.typicode.com/posts",
              headers: [{ key: "Content/Type", value: "application/json" }],
              bodyFormOrUrlData: [{ key: "userId", value: "3" }],
              testCase: { name: 3 }
            }
          ]
        }
      ],
      SaveToCollectionName: null,
      ToPlay: null,
      testCase: null
    };
  }
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
                method: this.state.method,
                url: this.state.url,
                headers: this.state.headers,
                bodyFormOrUrlData: this.state.bodyFormOrUrlData,
                testCase: testJson
              });
              this.props.alert.success(
                `Successfully saved to ${this.state.SaveToCollectionName} Collection`
              );
            }
          });
        }
        this.state.ToSideBarHistory.push({ method: method, url: url });
        console.log("This is inside update state from submit", headers);
        this.setState({
          ToResponseMethod: method,
          ToResponseUrl: url,
          ToResponseHeaders: headers,
          ToResponseBodyFormOrUrlData: bodyFormOrUrlData,
          ToSideBarHistory: this.state.ToSideBarHistory,
          testCase: testJson
        });
      } else {
        this.setState({
          ToResponseMethod: method,
          ToResponseUrl: url,
          ToResponseHeaders: [
            { key: "Content-Type", value: "application/json" }
          ],
          ToResponseBodyFormOrUrlData: bodyFormOrUrlData,
          ToSideBarHistory: this.state.ToSideBarHistory,
          testCase: testJson
        });
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
    console.log(data.value);
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
        this.props.alert.success("Collection Created successfully"); //React-alert to be added
      }
    } else {
      this.props.alert.error("Collection Name cannot be empty");
    }
  };
  handleDeleteCollection = (event, index) => {
    let newCollections = [...this.state.collections];
    newCollections.splice(index, 1);
    this.setState({ collections: newCollections });
  };
  handlePlayCollection = index => {
    this.setState({ ToPlay: this.state.collections[index] });
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
        <NewResponseComponent
          method={this.state.ToResponseMethod}
          url={this.state.ToResponseUrl}
          headers={this.state.ToResponseHeaders}
          bodyFormOrUrlData={this.state.ToResponseBodyFormOrUrlData}
          ToPlay={this.state.ToPlay}
          ToggleToPlayOff={this.ToggleToPlayOff}
          testCase={this.state.testCase}
        ></NewResponseComponent>
      </div>
    );
  }
}

export default withAlert()(DisplayComponent);
