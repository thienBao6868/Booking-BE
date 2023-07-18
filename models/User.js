const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const userSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    sex: {
      type: String,
      enum: ["Male", "Female", ""],
      required: false,
      default: "",
    },
    birthday: {
      date: { type: Number, required: false, default: 0 },
      month: { type: Number, required: false, default: 0 },
      year: { type: Number, required: false, default: 0 },
    },
    city: { type: String, required: false, default: "" },
    phoneNumber: { type: String, required: false, default: "" },
    facebookLink: { type: String, required: false, default: "" },
  },
  { timestamps: true }
);
userSchema.methods.toJSON = function () {
  const user = this._doc;
  delete user.password;
  delete user.isDeleted;
  return user;
};
userSchema.methods.generateToken = async function () {
  const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return accessToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
