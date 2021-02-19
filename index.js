const http = require("http");
const { getNorthcoders } = require("./controllers/northcoders.controller");

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
