import React from "react";
import FetchData from "./FetchData";
import GetData from "./GetData";

async function FetchFunction(method, headers, url, bodyFormOrUrlData) {
  let myHeaders = null;
  if (method == "GET") {
    if (headers.length > 0) {
      myHeaders = new Headers();
      headers.map(headers => {
        myHeaders.append(headers.key, headers.value);
      });
    }
    let newUrl = url;
    if (url.search("https://") == -1) {
      newUrl = `https://${this.props.url}`;
    }
    try {
      let result = await GetData(`${newUrl}`, method, myHeaders);
      return result;
    } catch (error) {
      console.log(error.message);
    }
  } else {
    if (headers.length > 0) {
      myHeaders = new Headers();
      headers.map(headers => {
        myHeaders.append(headers.key, headers.value);
      });
    }
    let newUrl = url;
    if (url.search("https://") == -1) {
      newUrl = `https://${url}`;
    }
    try {
      let result = await FetchData(
        `${newUrl}`,
        bodyFormOrUrlData,
        method,
        myHeaders
      );
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default FetchFunction;
