const http = require("http");
const {
  getHomePage,
  sendAllCats,
  addNewCat,
} = require("./controllers/cats_controllers.js");

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (url === "/" && method === "GET") {
    getHomePage(req, res);
  } else if (url === "/api/cats") {
    if (method === "GET") {
      sendAllCats(req, res);
    } else if (method === "POST") {
      addNewCat(req, res);
    }
  } else {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 500;
    res.write(JSON.stringify({ msg: "Internal Server Error!" }));
    res.end();
  }
});

server.listen(9090, () => console.log("Listening on port 9090..."));
