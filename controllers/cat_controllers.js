const { getCats, writeCat } = require("../models/cats_models.js");

exports.getHomePage = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.write(JSON.stringify({ msg: "Welcome to the home page" }));
  res.end();
};

exports.sendAllCats = (req, res) => {
  getCats((err, cats) => {
    if (err) console.log(err);
    else {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;
      res.write(JSON.stringify({ cats }));
      res.end();
    }
  });
};

exports.addNewCat = (req, res) => {
  let newCat = "";
  req.on("data", (packet) => (newCat += packet.toString()));
  req.on("end", () => {
    writeCat(newCat, (err, cat) => {
      if (err) console.log(err);
      else {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 201;
        res.write(
          JSON.stringify({
            cat,
            message: `Successfully added ${cat.name} to the database.`,
          })
        );
        res.end();
      }
    });
  });
};
