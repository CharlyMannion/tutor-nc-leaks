const http = require("http");
const fs = require("fs");

// SEE NODE SEVER EXAMPLE FOR SEPARATED FILES

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

const postCat = (request, response) => {
  let newCat = "";
  request.on("data", (packet) => {
    newCat += packet.toString();
  });
  request.on("end", () => {
    sendCat(newCat, (err, cat) => {
      if (err) console.log(err);
      else {
        // response.setHeader('Content-Type', 'application/json');
        // response.statusCode = 201;
        response.write(
          JSON.stringify({
            cat,
            message: `Successfully added ${cat.name} to the database`,
          })
        );
        response.end();
      }
    });
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

const sendCat = (catObj, cb) => {
  fetchCats((err, existingCats) => {
    const newCatID = existingCats.length + 1;
    const parsedNewCat = {
      ...JSON.parse(catObj),
      id: newCatID,
    };

    fs.writeFile(
      "./data/data.json",
      JSON.stringify(parsedNewCat, null, 2),
      (err) => {
        if (err) console.log(err);
        else {
          console.log("hoora!");
          cb(null, parsedNewCat);
        }
      }
    );
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
      postCat(request, response);
    }
  }
});

server.listen(9090, (err) => {
  if (err) console.log(err);
  else console.log("Server is listening on 9090");
});
