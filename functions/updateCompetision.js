const Competition = require("../model/competition");

// save the url
const updateCompetision = async (id) => {
  try {
    console.log(id);
    const res = await Competition.updateOne(
      { id },
      { $set: { Status: "APPROVED" } }
    );

    return res;
  } catch (err) {}

  // save the update
};

module.exports = updateCompetision;

//
