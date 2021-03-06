const https = require("https");
const { fileGenerator } = require("../utils/fileGenerator");

// Making a request to a server and receiving the response (data about poeple inc. northcoders), then storing the response data locally. [We are the client].
// -> later we will create a web server, and serve this data to the world...

const getInstructions = () => {
  const options = {
    hostname: "nc-leaks.herokuapp.com",
    path: "/api/confidential",
    method: "GET",
  };

  // setup a new request object with the options above
  const request = https.request(options, (response) => {
    // callback invoked with a response object

    // declare a body variable to build the response from the packets
    let body = "";

    // use response's on method to run a callback every time a packet is received
    response.on("data", (packet) => {
      body += packet.toString();
    });

    response.on("end", () => {
      //parse json string back into object ready to be used...
      const parsedBody = JSON.parse(body);
      //   console.log(parsedBody, "PARSED BODY");

      // convert cryptic string to a readable one
      const readableString = parsedBody.crypticString;
      //   console.log(readableString, "PARSED TO READABLE STRING");

      fileGenerator(readableString, "README.md", (err, readMeData) => {
        if (err) callback(err);
        else console.log("readme file has been made");
      });
    });
  });

  // call the end method to actually send the request once setup
  request.end();
};

getInstructions();
