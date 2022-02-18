const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
//varifis the token and returns the true value
const varifier = async (token, next) => {
  const varify = await jwt.verify(token, process.env.SECRET);
  return varify;
};
//all 3 of this functions varifies the admins to don't get acceses to nonadmin users
// in 3 routes
const authrozior = async (req, res, next) => {
  if (req.cookies.jwt) {
    const authroztion = await varifier(req.cookies.jwt);
    if (authroztion) next();
  } else {
    res.redirect("/");
  }
};
const isAuth = async (req, res, next) => {
  if (req.cookies.jwt) {
    const isAuth = await varifier(req.cookies.jwt);
    isAuth ? res.redirect("/dashbord") : next();
  } else {
    next();
  }
};
const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    const data = await varifier(token);
    res.locals.user = data;
    next();
  } else {
    res.locals.user = null;
    next();
  }
};
module.exports = {
  varifier,
  authrozior,
  isAuth,
  checkUser,
};
