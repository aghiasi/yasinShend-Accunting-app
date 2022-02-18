const res = require("express/lib/response");
const { Schema, model } = require("mongoose");
const { dateShamsi } = require("../hooks/JDF");
const _ = require("lodash");
// user cart schema for nested schema
const cartSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  amount: {
    required: true,
    type: Number,
  },
  date: {
    type: String,
    default: dateShamsi(),
  },
  by: String,
});
const productSchema = new Schema({
  name: String,
  numberof: Number,
  fee: Number,
  pay: Number,
  // the amount of the product left in urser invoic
  // this function count
  left: {
    type: String,
    default: function () {
      return this.numberof;
    },
  },
});
//the payment schema for nested schema
const paymentSchema = new Schema({
  howmuch: {
    type: Number,
    default: 0,
  },
  paymentmethod: {
    cash: {
      type: Boolean,
      default: true,
    },
    czech: {
      date: {
        type: String,
        default: dateShamsi(),
      },
      czechnumber: String,
    },
    creator: {
      type: String,
    },
  },
  to: {
    type: String,
  },
  date: {
    type: String,
    default: dateShamsi(),
  },
});
//user schema is the main schema of this page and the
// nested schemas are for this schema
const userSchema = new Schema({
  username: {
    type: String,
    maxlength: 50,
    unique: true,
  },
  phone: {
    type: Number,
    maxlength: 15,
  },
  cart: {
    type: [cartSchema],
    default: [],
  },
  payment: [paymentSchema],
  products: [productSchema],
  date: {
    type: String,
    default: dateShamsi(),
  },
  total: {
    type: Number,
  },
  totalpay: {
    type: Number,
  },
  debt: {
    type: String || Number,
  },
});
// this function count the totals and other methods for the user schema with the params that we have
// this count total debat left of the products etc...
userSchema.pre("save", async function (next) {
  //count the total price of each pruduct
  let totalFor = 0;
  totalLeft = 0;
  this.products.map((item) => {
    item.pay = item.fee * item.numberof;
    totalFor += item.pay;
  });
  let productLeft = this.products;
  this.cart.map((item) => {
    if (item.isNew) {
      _.find(productLeft, (ob) => {
        if (ob.name === item.name) {
          ob.left = ob.left - item.amount;
        }
      });
    }
  });
  this.total = totalFor;
  let allpay = 0;
  //get all payments
  let allpayment = this.payment.map((item) => {
    return item.howmuch;
  });
  for (pay of allpayment) {
    if (pay !== null) {
      totalFor -= pay;
      allpay += pay;
    }
  }
  this.totalpay = allpay;
  formatedDebt = Intl.NumberFormat("en-US").format(totalFor);
  if (totalFor == 0) this.debt = "تصفیه";
  if (totalFor < 0) this.debt = `بستانکار ${formatedDebt}`;
  if (totalFor > 0) this.debt = formatedDebt;
  next();
});
// this function adds the products in the user card
// and add the new payments in the user history
userSchema.statics.addProduct = async function (info) {
  const user = await this.findOne({ username: info.username });
  if (info.payment) user.payment.push(info.payment);
  if (info.cart) user.cart.push(...info.cart);
  user.save();
  return user;
};
const User = model("user", userSchema);
module.exports = User;
