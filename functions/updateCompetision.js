const Competitions = require("../model/competition");

// save the url
const updateCompetision = async (id, compt) => {
  try {
    const res = await Competitions.updateOne({ id }, { $set: compt });

    return res;
  } catch (err) {}
  // save the update
};

module.exports = updateCompetision;
