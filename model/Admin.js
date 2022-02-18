// admin schema and model
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
//warning this model dose not hash the passwords so u have add that part
//with the bcrypt or other hashing functions
const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
