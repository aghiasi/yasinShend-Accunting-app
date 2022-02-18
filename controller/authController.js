//3rd party packeges
const _ = require("lodash");
const ADMINS = require("../hooks/ADMINS");
const token = require("../middleware/jwt");
const bcrypt = require("bcrypt");
const Admin = require("../model/Admin");
//list of products for app ---- for the bigest apps this part should get model
//and not to hard coded here just we have 5 products total so it's ok .
const products = [
  "سه کیلویی",
  "چهار کیلویی",
  "پنج کیلویی",
  "شیش کیلویی",
  "هفت کیلویی",
];
//this is base page controller
const loginHandler = (req, res, next) => {
  res.render("home.ejs");
};
//the page if user loged in controller
const loginAdmin = async (req, res, next) => {
  //search for username in database
  const found = await Admin.findOne({ username: req.body.username });
  if (found) {
    //checks the password
    const passwordCheck = await bcrypt.compare(
      req.body.password,
      found.password
    );
    if (passwordCheck) {
      //set the jwt cockie
      const jwt = await token(found.username);
      res.cookie("jwt", jwt, { maxAge: 1000 * 60 * 30 });
      res.redirect("/");
    } else {
      // password is not corect
      res.status(403).json({ error: "نام کاربری یا کلمه عبور اشتباه است" });
    }
  } else {
    // username is not in database
    res.status(403).json({ error: "نام کاربری یا کلمه عبور اشتباه است" });
  }
};
//renders the dashbord
const dashbordHandler = (req, res) => {
  res.render("dashbord", { products });
};
//log out the user by set the jwt to 1 ms to empty stirng
const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 }).redirect("/");
};
//exproting modules
module.exports = {
  loginHandler,
  loginAdmin,
  dashbordHandler,
  logout,
};
