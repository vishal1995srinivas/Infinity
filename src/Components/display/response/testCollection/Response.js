import React from "react";
import FetchFunction from "./FetchFunction";

async function Response(request) {
  try {
    let result = await FetchFunction(
      request.method,
      request.headers,
      request.url,
      request.bodyFormOrUrlData
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
export default Response;
