const http = require("http");
const fs = require("fs");

// ---- controller -----
const getCats = function (request, response) {
  fetchCats((err, cats) => {
    if (err) console.log(err);
    else {
      response.write(JSON.stringify(cats)); // controller
      response.end(); // controller
    }
  });
};

// ----- model ------
const fetchCats = function (cb) {
  fs.readFile("./data/data.json", "utf8", (err, data) => {
    if (err) console.log(err);
    else {
      const parsedData = JSON.parse(data); // [{cat data}, {}, {}]
      const catNames = parsedData.map((cat) => cat.name); // ["Felix", "Garfield"]
      cb(null, catNames);
    }
  });
};

// ---- server -----

const server = http.createServer((request, response) => {
  const { url, method } = request;
  if (url === "/") {
    response.write("hello from the server");
    response.end();
  }
  if (url === "/cats") {
    if (method === "GET") {
      getCats(request, response); // controller
    }
    if (method === "POST") {
      let body = "";
      request.on("data", (packet) => {
        body += packet.toString();
      });
      request.on("end", () => {
        const newCatObj = JSON.parse(body);
        fs.readFile("./data.json", "utf8", (err, data) => {
          if (err) console.log(err);
          else {
            const parsedData = JSON.parse(data);
            parsedData.push(newCatObj);
            fs.writeFile(
              "./data.json",
              JSON.stringify(parsedData, null, 2),
              (err) => {
                if (err) console.log(err);
                else console.log("hoora!");
              }
            );
          }
        });
      });
      response.write("got the cat thanks");
      response.end();
    }
  }
});

server.listen(9090, (err) => {
  if (err) console.log(err);
  else console.log("Server is listening on 9090");
});