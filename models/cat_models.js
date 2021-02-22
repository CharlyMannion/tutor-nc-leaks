const fs = require("fs");

exports.getCats = (cb) => {
  const cats = [];
  let responseCount = 0;
  fs.readdir("./data/cats", (err, catFileNames) => {
    catFileNames.forEach((catFileName, i) => {
      fs.readFile(`./data/cats/${catFileName}`, "utf8", (err, catString) => {
        if (err) console.log(err);
        else {
          const parsedCat = JSON.parse(catString);
          cats[i] = parsedCat;
          if (++responseCount === catFileNames.length) cb(null, cats);
        }
      });
    });
  });
};

exports.writeCat = (newCat, cb) => {
  exports.getCats((err, existingCats) => {
    const newCatID = existingCats.length + 1;
    const parsedNewCat = {
      ...JSON.parse(newCat),
      id: newCatID,
    };
    fs.writeFile(
      `./data/cats/c${newCatID}.json`,
      JSON.stringify(parsedNewCat, null, 2),
      (err) => {
        if (err) console.log(err);
        else cb(null, parsedNewCat);
      }
    );
  });
};
