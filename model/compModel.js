// name , from , to , time , description
const { Schema, model } = require("../config/mongo");

const createComp = new Schema({
  id: {
    required: true,
    type: String,
  },

  Date: {
    required: true,
    type: String,
  },
  startTime: {
    required: true,
    type: String,
  },
  endTime: {
    required: true,
    type: String,
  },
  orgnizerName: {
    required: true,
    type: String,
  },
  phoneNUmner: {
    required: true,
    type: String,
  },
  centerName: {
    required: true,
    type: String,
  },
  location: {
    required: true,
    type: String,
  },
  firstPlacePrize: {
    required: true,
    type: String,
  },
  secondPlacePrize: {
    required: true,
    type: String,
  },
  thirdPlacePrize: {
    required: true,
    type: String,
  },
  bestplayeraward: {
    required: true,
    type: String,
  },
  bestKBaward: {
    required: true,
    type: String,
  },
  soceraward: {
    required: true,
    type: String,
  },
  costCompetition: {
    required: true,
    type: String,
  },
  passportNumber: {
    required: true,
    type: String,
  },
  Status: {
    required: true,
    type: String,
  },
});

const Competition = model("Competition", createComp);

module.exports = Competition;
