const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const adminSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
    minlength: 8,
  },
});

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
