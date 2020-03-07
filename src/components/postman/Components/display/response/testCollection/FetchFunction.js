import React from "react";
import FetchData from "./FetchData";
import GetData from "./GetData";

async function FetchFunction(method, headers, url, bodyFormOrUrlData) {
  let myHeaders = null;
  console.log(headers);
  if (method == "GET") {
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
      let result = await GetData(`${newUrl}`, method, myHeaders);
      return result;
    } catch (error) {
      console.log(error.message);
      let errorJson = {
        Error: `${error}, Message : ${error.message}`
      };
      return errorJson;
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
      let errorJson = {
        Error: `${error}, Message : ${error.message}`
      };
      return errorJson;
    }
  }
}

export default FetchFunction;
