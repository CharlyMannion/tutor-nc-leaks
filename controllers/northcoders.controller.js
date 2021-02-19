const {
  fetchNorthcoders,
  fetchNorthcoderByUsername,
} = require("../models/northcoders.model");

const getNorthcoders = (request, response) => {
  fetchNorthcoders((err, northcoders) => {
    if (err) console.log(err);
    else {
      response.write(JSON.stringify(northcoders));
      response.end();
    }
  });
};

const getNorthcoderByUsername = (request, response, username) => {
  fetchNorthcoderByUsername(username, (err, northcoders) => {
    if (err) console.log(err);
    else {
      response.write(JSON.stringify(northcoders));
      response.end();
    }
  });
};

module.exports = { getNorthcoders, getNorthcoderByUsername };
