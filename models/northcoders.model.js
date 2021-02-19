const fs = require("fs");

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

module.exports = { fetchNorthcoders };
