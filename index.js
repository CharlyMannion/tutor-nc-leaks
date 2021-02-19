const http = require("http");
const fs = require("fs");
const chch = require("./data/Northoders.json");

// ------------------ CONTROLLER ------------------

const getNorthcoders = (request, response) => {
  fetchNorthcoders((err, northcoders) => {
    if (err) console.log(err);
    else {
      // response.statusCode = 200;
      // response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(northcoders));
      response.end();
    }
  });
};

// ------------------ MODEL ------------------

const fetchNorthcoders = (cb) => {
  fs.readFile("./data/northoders.json", "utf8", (err, data) => {
    if (err) console.log(err);
    else {
      const parsedData = JSON.parse(data); // [{northocoder data}, {}, {}]
      const firstNames = parsedData.map((northcoder) => northcoder.firstName); // ["tom", "mitch"]
      cb(null, firstNames);
    }
  });
};

// ------------------ SERVER ------------------

const server = http.createServer((request, response) => {
  const { url, method } = request;

  if (url === "/api" && method === "GET") {
    response.statusCode = 200;
    response.write("hello friend!");
    response.end();
  }

  if (url === "/api/northcoders" && method === "GET") {
    getNorthcoders(request, response); //controller
  }
});

server.listen(9090, (err) => {
  if (err) console.log(err);
  else console.log("the server is running on 9090");
});
