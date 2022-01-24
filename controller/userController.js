const { repeat } = require("lodash");
const { varifier } = require("../middleware/varify");
const User = require("../model/User");
const getUser = async (req, res) => {
  const { data } = req.params;
  let param = {};
  if (isNaN(parseInt(data))) {
    param = { username: data };
  } else {
    param = { phone: data };
  }
  const user = await User.findOne(param);
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
  const creator = await varifier(req.cookies.jwt);
  if (creator) {
    const user = await User({
      username: data.username,
      phone: data.phone,
      payment: [
        {
          howmuch: data.payment,
          paymentmethod: { creator, ...data.paymentmethod },
          to: data.to,
        },
      ],
      products: data.products,
    });
    user
      .save()
      .then((result) => {
        res.render("checkout", { data: result });
      })
      .catch((err) => {
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
const deleteUserHandler = (req, res) => {
  const user = req.body;
  User.findOneAndDelete(user)
    .then((result) => res.status(200).json({ mas: "done" }))
    .catch((err) => res.status(400).json({ error: "some thing went wrong" }));
};
module.exports = {
  postUser,
  createUserHandler,
  getUser,
  cartHandler,
  deleteUserHandler,
};
