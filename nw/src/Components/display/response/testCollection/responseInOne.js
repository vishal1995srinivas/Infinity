var diff = require("deep-diff").diff;
async function responseInOne(request) {
  async function fetchfunction(method, headers, url, bodyFormOrUrlData) {
    let myHeaders = null;
    if (method == "GET") {
      console.log(headers);
      if (headers.length > 0) {
        myHeaders = new Headers();
        headers.map(header => {
          myHeaders.append(header.key, header.value);
        });
      }
      let newUrl = url;
      if (url.search("https://") == -1) {
        newUrl = `https://${this.props.url}`;
      }
      GetData(`${newUrl}`, method, myHeaders)
        .then(data => {
          let changes = diff(this.props.testCase, data);
          if (changes) {
            return changes;
          } else {
            let successJson = {
              TestCase: "Perfectly Matched",
              Operation: "Success"
            };
            return successJson;
          }
        })
        .catch(error => {
          console.log(error.message);
          let errorJson = {
            Error: `${error}, Message : ${error.message}`
          };
          return errorJson;
        });
    } else {
      if (headers.length > 0) {
        myHeaders = new Headers();
        headers.map(header => {
          myHeaders.append(header.key, header.value);
        });
      }
      let newUrl = url;
      if (url.search("https://") == -1) {
        newUrl = `https://${url}`;
      }
      try {
        let result = await fetchData(
          `${newUrl}`,
          bodyFormOrUrlData,
          method,
          myHeaders
        );
        let changes = diff(this.props.testCase, result);
        if (changes) {
          return changes;
        } else {
          let successJson = {
            TestCase: "Matched",
            Operation: "Success"
          };
          return successJson;
        }
      } catch (error) {
        console.log(error);

        let errorJson = {
          Error: `${error}, Message : ${error.message}`
        };
        return errorJson;
      }
    }
  }
  async function fetchData(url = "", data = {}, method, myHeaders) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: myHeaders,
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }
  async function GetData(url = "", method, myHeaders) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: myHeaders,
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer" // no-referrer, *client
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }

  let fetch = await fetchfunction(
    "POST",
    [{ key: "Content-Type", value: "application/json" }],
    "https://jsonplaceholder.typicode.com/posts",
    [{ userId: 3 }]
  );
  return fetch;
}

export default responseInOne;
