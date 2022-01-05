const { repeat } = require("lodash");
const { varifier } = require("../middleware/varify");
const User = require("../model/User");
const getUser = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (user) {
    res.render("admin", {
      data: user,
      products: user.products,
      debt: user.debt,
      total: user.total,
      cart: user.cart,
      createdData: user.date,
      payment: user.payment,
    });
  } else {
    res.status(404).json("کاربر یافت نشد");
  }
};
const createUserHandler = async (req, res) => {
  const data = req.body;
  const { three, four, five, six, seven } = data;
  const creator = await varifier(req.cookies.jwt);
  if (creator) {
    const user = await User({
      username: data.username,
      payment: [{ howmuch: data.payment, paymentmethod: { creator } }],
      products: [three, four, five, six, seven],
    });
    user
      .save()
      .then((result) => {
        res.render("checkout", { data: result });
      })
      .catch((err) => {
        console.log(err);
        err.code === 11000
          ? res.status(400).json({ error: "این کاربر دارای قرار داد می باشد" })
          : res.status(400).json({ error: "خطا رخ داده دوباره تلاش کنید" });
      });
  }
};
const postUser = async (req, res) => {
  const user = req.body;
  const userinfo = await User.addProduct(user);
  userinfo
    ? res.status(200).json({ result: "ثبت شد" })
    : res.status(400).json({ error: "خطایی رخ داده دوباره امتحان کنید" });
};
const cartHandler = (req, res) => {
  const { username } = req.params;
  User.findOne({ username })
    .then((result) => {
      res.render("cartcheck", { username: result.username, data: result.cart });
    })
    .catch((err) => res.status(404).json({ error: "کاربر یافت نشد" }));
};
module.exports = {
  postUser,
  createUserHandler,
  getUser,
  cartHandler,
};
