//3rd party packeges
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
//costom hooks and controllers
const router = require("./router/router");
const { checkUser } = require("./middleware/varify");
//constants
const app = express();
mongoose
  .connect((uri = process.env.DATABASE_URL))
  .then((result) =>
    app.listen(process.env.PORT || 8080, console.log("server is up "))
  )
  .catch((err) => console.log(err));
//app config & middle wares
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.get("*", checkUser);
app.use(router);
