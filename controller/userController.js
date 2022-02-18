//erd party packeges
const { varifier } = require("../middleware/varify");
const User = require("../model/User");
// the search bar for finding the user by phone or username in database
const getUser = async (req, res) => {
  const { data } = req.params;
  let param = {};
  //checks if the input is sting
  if (isNaN(parseInt(data))) {
    param = { username: data };
  } else {
    //the input is phone number so it searchs with phone
    param = { phone: data };
  }
  const user = await User.findOne(param);
  if (user) {
    //renders the user that found
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
    //the user not found
    res.status(404).json("کاربر یافت نشد");
  }
};
// create user controller
const createUserHandler = async (req, res) => {
  const data = req.body;
  //checks if it's valid admin that is creating the new user
  const creator = await varifier(req.cookies.jwt);
  if (creator) {
    // create user with schema of the user
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
        //renders the invoic for the user that created
        res.render("checkout", { data: result });
      })
      .catch((err) => {
        //handels the errors if we have
        err.code === 11000
          ? res.status(400).json({ error: "این کاربر دارای قرار داد می باشد" })
          : res.status(400).json({ error: "خطا رخ داده دوباره تلاش کنید" });
      });
  }
};
//adds new products to user cart
const postUser = async (req, res) => {
  const user = req.body;
  const userinfo = await User.addProduct(user);
  userinfo
    ? res.status(200).json({ result: "ثبت شد" })
    : res.status(400).json({ error: "خطایی رخ داده دوباره امتحان کنید" });
};
// returns the user cart
const cartHandler = (req, res) => {
  const { username } = req.params;
  User.findOne({ username })
    .then((result) => {
      res.render("cartcheck", { username: result.username, data: result.cart });
    })
    .catch((err) => res.status(404).json({ error: "کاربر یافت نشد" }));
};
// delete the user
const deleteUserHandler = (req, res) => {
  const user = req.body;
  User.findOneAndDelete(user)
    .then((result) => res.status(200).json({ mas: "done" }))
    .catch((err) => res.status(400).json({ error: "some thing went wrong" }));
};
//modules that exprots
module.exports = {
  postUser,
  createUserHandler,
  getUser,
  cartHandler,
  deleteUserHandler,
};
