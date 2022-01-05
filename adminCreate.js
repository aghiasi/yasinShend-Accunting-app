const Admin = require("./model/Admin");
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL).then((result) => {
  Admin.create({
    username: "محمد غیاثی",
    password: "$2b$10$I9g/1P/yQI.bAuVgdWPx2OcUFR4nXhxLjqEb.xJnzI.hV6nEicUne",
  }).then((result) => console.log(result));
});
