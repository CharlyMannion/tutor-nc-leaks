const http = require("http");

const {
  getNorthcoders,
  getNorthcoderByUsername,
} = require("./controllers/northcoders.controller");

// ------------------ SERVER ------------------

const server = http.createServer((request, response) => {
  const { url, method } = request;
  const splitUrl = url.split("/");
  const username = splitUrl[splitUrl.length - 1];

  if (url === "/api" && method === "GET") {
    response.statusCode = 200;
    response.write("hello friend!");
    response.end();
  }
  if (url === "/api/northcoders" && method === "GET") {
    getNorthcoders(request, response); //controller
  }
  if (url === `/api/northcoders/${username}` && method === "GET") {
    getNorthcoderByUsername(request, response, username);
  }
});

server.listen(9090, (err) => {
  if (err) console.log(err);
  else console.log("the server is running on 9090");
});
