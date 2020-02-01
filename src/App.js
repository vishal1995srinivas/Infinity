import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DisplayComponent from "./Components/display/DisplayComponent";
import HeaderComponent from "./Components/header/HeaderComponent";
import FooterComponent from "./Components/footer/FooterComponent";
import styles from "./Components/styles/mainStyles.css";

function App() {
  return (
    <div className="App">
      <HeaderComponent></HeaderComponent>
      <DisplayComponent></DisplayComponent>
      <FooterComponent></FooterComponent>
    </div>
  );
}

export default App;
