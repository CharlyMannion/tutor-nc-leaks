const { fetchNorthcoders } = require("../models/northcoders.model");

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

module.exports = { getNorthcoders };
