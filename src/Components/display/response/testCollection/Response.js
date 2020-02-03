import React from "react";
import FetchFunction from "./FetchFunction";

async function Response(request) {
  try {
    if (request.method == "GET") {
      let result = await FetchFunction(
        request.method,
        request.headers,
        request.url,
        null
      );
      return result;
    } else {
      let result = await FetchFunction(
        request.method,
        request.headers,
        request.url,
        request.bodyFormOrUrlData
      );
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}
export default Response;
