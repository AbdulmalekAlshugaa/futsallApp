const getApprovalCenter = require("../model/centers");
// list all the competsion

const findCompetisionBasedOnStatus = async (status) => {
  try {
    const approvelCenters = await getApprovalCenter.find({ status });
    return approvelCenters;
  } catch (error) {
    console.log(error);
  }
};

module.exports = findCompetisionBasedOnStatus;
