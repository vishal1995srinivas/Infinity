import React, { Component } from "react";
import MainComponent from "./main/MainComponent";
import SidebarComponent from "./sidebar/SidebarComponent";
import ResponseComponent from "./response/ResponseComponent";
class DisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      method: "GET",
      url: "",
      headers: [{ key: "", value: "" }],
      bodyFormOrUrlData: [{ key: "", value: "" }],
      ToResponseMethod: "GET",
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
              method: "GET",
              url: "https://jsonplaceholder.typicode.com/posts",
              headers: [{ key: "Content/Type", value: "application/json" }],
              bodyFormOrUrlData: [{ key: "", value: "" }]
            },
            {
              method: "POST",
              url: "https://jsonplaceholder.typicode.com/posts",
              headers: [{ key: "Content/Type", value: "application/json" }],
              bodyFormOrUrlData: [{ key: "", value: "" }]
            },
            {
              method: "PUT",
              url: "https://jsonplaceholder.typicode.com/posts",
              headers: [{ key: "Content/Type", value: "application/json" }],
              bodyFormOrUrlData: [{ key: "", value: "" }]
            },
            {
              method: "DELETE",
              url: "https://jsonplaceholder.typicode.com/posts",
              headers: [{ key: "Content/Type", value: "application/json" }],
              bodyFormOrUrlData: [{ key: "", value: "" }]
            }
          ]
        }
      ],
      SaveToCollectionName: null,
      ToPlay: null
    };
  }
  updateStateFromSubmit = (method, url, headers, bodyFormOrUrlData) => {
    if (url !== "") {
      if (headers.length > 0) {
        if (this.state.SaveToCollectionName !== null) {
          this.state.collections.map(collection => {
            if (collection.name == this.state.SaveToCollectionName) {
              collection.requests.push({
                method: this.state.method,
                url: this.state.url,
                headers: this.state.headers,
                bodyFormOrUrlData: this.state.bodyFormOrUrlData
              });
              alert(
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
          ToSideBarHistory: this.state.ToSideBarHistory
        });
      } else {
        alert("Headers are empty");
      }
    } else {
      alert("URL is empty.");
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
    let newCollection = [
      ...this.state.collections,
      {
        name: this.state.collectionName,
        requests: []
      }
    ];
    this.setState({ collections: newCollection, collectionName: "" });
    alert("Collection Created"); //React-alert to be added
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
    // console.log(this.state.SaveToCollectionName);
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
        <ResponseComponent
          method={this.state.ToResponseMethod}
          url={this.state.ToResponseUrl}
          headers={this.state.ToResponseHeaders}
          bodyFormOrUrlData={this.state.ToResponseBodyFormOrUrlData}
          ToPlay={this.state.ToPlay}
          ToggleToPlayOff={this.ToggleToPlayOff}
        ></ResponseComponent>
      </div>
    );
  }
}

export default DisplayComponent;
