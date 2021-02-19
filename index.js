const http = require("http");

const server = http.createServer((request, response) => {
  //   console.log(request);
  if (url === "/api" && method === "GET") {
    response.statusCode = 200;
    response.write("hello friend!");
    response.end();
  }
});

server.listen(9090, (err) => {
  if (err) console.log(err);
  else console.log("the server is running on 9090");
});
