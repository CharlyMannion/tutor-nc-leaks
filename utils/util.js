const fs = require("fs");

const fileGenerator = (contents, fileName, callback) => {
  fs.writeFile(`./${fileName}`, `${contents}`, (err, readMeData) => {
    if (err) callback(err);
    else callback(null, readMeData);
  });
};

module.exports = { fileGenerator };
