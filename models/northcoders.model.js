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

const fetchNorthcoderByUsername = (username, cb) => {
  fs.readFile("./data/northoders.json", "utf8", (err, data) => {
    if (err) console.log(err);
    else {
      const parsedData = JSON.parse(data); // [{northocoder data}, {}, {}]
      const toReturn = [];
      parsedData.map((northcoder) => {
        if (northcoder.username === username) {
          toReturn.push(northcoder.firstName);
        }
      }); // ["tom", "mitch"]
      cb(null, toReturn);
    }
  });
};

module.exports = { fetchNorthcoders, fetchNorthcoderByUsername };
