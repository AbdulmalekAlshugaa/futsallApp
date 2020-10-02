const { v4: uuidv4 } = require("uuid");
const Competition = require("../model/compModel");

// create function to store the court
const Createcompetition = async (comptobj) => {
  try {
    Createcompetition.id = uuidv4();
    const addCompet = new Competition({ id: uuidv4(), ...comptobj });

    await addCompet.save();
    return addCompet;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = Createcompetition;
