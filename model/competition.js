// name , from , to , time , description
const { Schema, model } = require("../config/mongo");

const createCompetitionModel = new Schema({
  id: {
    required: true,
    type: String,
  },
  centerId: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  from: {
    required: true,
    type: String,
  },
  to: {
    required: true,
    type: String,
  },
  time: {
    required: true,
    type: String,
  },
  decription: {
    required: true,
    type: String,
  },
  prize: {
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
  Status: {
    required: true,
    type: String,
    default: "PENDING",
  },
  passportNumber: {
    required: true,
    type: String,
  },
});

const Competition = model("CompetitionsCollection", createCompetitionModel);

module.exports = Competition;
