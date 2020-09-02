const { Mongoose } = require("mongoose");

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
/***
 * Modelo de la base de datos de los usuarios
 * Posts database model
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [{ type: ObjectId, ref: "User" }],
  following: [{ type: ObjectId, ref: "User" }],
});

module.exports = mongoose.model("User", userSchema);
