const filterNorthcodersArray = (arr) => {
  let northcodersArr = [];

  arr.filter((person) => {
    if (person.job.workplace === "northcoders") {
      northcodersArr.push(person);
    }
  });

  return northcodersArr;
};

module.exports = { filterNorthcodersArray };
