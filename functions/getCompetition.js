const competions = require("../model/competition");
// list all the competsion

const findCompetisionBasedOnStatus = async (Status) => {
  try {
    const comption = await competions.find({ Status });
    return comption;
  } catch (error) {
    console.log(error);
  }
};

module.exports = findCompetisionBasedOnStatus;
