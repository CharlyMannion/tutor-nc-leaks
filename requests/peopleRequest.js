const https = require("https");
const { fileGenerator } = require("../utils/fileGenerator");
const { filterNorthcodersArray } = require("../utils/utils");

// 1. Use node's HTTP module to retrieve a list of all the available people at the following end point: `https://nc-leaks.herokuapp.com/api/people`.

// 2. Once you have the list of people. Find all of the northcoders from the list and save their data to a file.

const getPeople = () => {
  const options = {
    hostname: "nc-leaks.herokuapp.com",
    path: "/api/people",
    method: "GET",
  };

  const request = https.request(options, (response) => {
    let body = "";

    response.on("data", (packet) => {
      body += packet.toString();
    });

    response.on("end", () => {
      const parsedBody = JSON.parse(body);
      const people = parsedBody.people;
      //   console.log(Array.isArray(people), "PEOPLE");

      const northcoders = filterNorthcodersArray(people);
      //   console.log(northcoders);

      stringNorthcoders = JSON.stringify(northcoders);
      console.log(stringNorthcoders);

      fileGenerator(stringNorthcoders, "Northoders.md", (err, readMeData) => {
        if (err) callback(err);
        else console.log("got northcoders");
      });
    });
  });

  request.end();
};

getPeople();
