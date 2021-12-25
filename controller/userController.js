
const { varifier } = require('../middleware/varify');
const User = require('../model/User');

const getUser = async (req,res) => {
 //befor render we found the user then send him to front 
 const {username} = req.params;
 const user = await User.find({username});
 console.log(user);
};
const createUserHandler=async(req,res)=>{
 const data = req.body;
 const {three,four,five,six,seven} = data
 const creator = await varifier(req.cookies.jwt);
 const user = await User({
  username:data.username,
  payment:[{howmuch:data.payment},],
   three,four,five,six,seven
 });
 user.save().then(result=>res.render('checkout',{data:result}))
};
const postUser = (req,res) => {
  return;
};
module.exports = {
 postUser,
 createUserHandler,
 getUser,
}