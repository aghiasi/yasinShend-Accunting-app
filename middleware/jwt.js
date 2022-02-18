// this middleware returns jwt token
const jwt = require("jsonwebtoken");
const token = async (username) => {
  const token = await jwt.sign(username, process.env.SECRET);
  return token;
};
module.exports = token;
