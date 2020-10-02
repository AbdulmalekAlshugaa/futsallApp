const { Schema, model } = require("../config/mongo");
const isEmail = require("validator/lib/isEmail");
const isMobilePhone = require("validator/lib/isMobilePhone");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "Email is not valid"],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      validator: [isMobilePhone, "Phone number is not valid"],
    },
    role: {
      type: String,
      required: true,
      enum: ["OWNER", "ADMIN", "PLAYER"],
    },
    position: {
      type: String,
      enum: ["GK", "FB", "MD", "ATT"],
    },
    natoinality: {
      type: String,
      required: true,
    },
    passpoerNumber: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const users = model("Users", UserSchema);

module.exports = users;
