const { filterNorthcodersArray } = require("../utils/utils");

describe("#filterNorthcodersArray", () => {
  it("returns an empty string when passed an empty array", () => {
    const arr = [];
    const actual = filterNorthcodersArray(arr);
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it("returns an empty string array when passed an array with one person object who is not a northcoder", () => {
    const arr = [
      {
        firstName: "Herminio",
        lastName: "Buckridge",
        img_url: "http://lorempixel.com/640/480/people",
        job: {
          team: "experiences",
          title: "virtual",
          workplace: "Franecki LLC",
        },
        username: "PermutationFishfingerProfessor",
      },
    ];
    const actual = filterNorthcodersArray(arr);
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it("returns a string of an array with a northcoder inside it", () => {
    const arr = [
      {
        firstName: "Noemi",
        lastName: "Romaguera",
        img_url: "http://lorempixel.com/640/480/people",
        job: {
          team: "infomediaries",
          title: "impactful",
          workplace: "Willms Inc",
        },
        username: "FruityMitchianAbsurd",
      },
      {
        firstName: "Gerhard",
        lastName: "Kulas",
        img_url: "http://lorempixel.com/640/480/people",
        job: {
          team: "technologies",
          title: "bricks-and-clicks",
          workplace: "Gorczany - Herman",
        },
        username: "PuppyProfessorButterMonsterPraline",
      },
      {
        firstName: "Josh",
        lastName: "Gray",
        img_url: "",
        job: { workplace: "northcoders", team: "Onboarding", title: "Mentor" },
        username: "ziziou91",
      },
    ];
    const actual = filterNorthcodersArray(arr);
    const expected = [
      {
        firstName: "Josh",
        lastName: "Gray",
        img_url: "",
        job: { workplace: "northcoders", team: "Onboarding", title: "Mentor" },
        username: "ziziou91",
      },
    ];
    expect(actual).toEqual(expected);
  });
});
