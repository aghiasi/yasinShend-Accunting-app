const _ = require('lodash');
const ADMINS = require('../hooks/ADMINS');
const token = require('../middleware/jwt');
const bcrypt = require('bcrypt');
const loginHandler = (req,res,next) => {
  res.render('home.ejs');
};
const loginAdmin = async (req,res,next) => {
 const found = _.find(ADMINS,{username:req.body.username});
 if(found){
  const passwordCheck = await bcrypt.compare(req.body.password,found.password);
  if(passwordCheck){
   const jwt =await token(found.username);
   res.cookie('jwt',jwt,{maxAge:1000*60*15});
   res.redirect('/');

  }else{
    res.status(403).json({error:'password not correct'});
  }
 }else{
    res.status(403).json({error:'not found'});
 }
}
const dashbordHandler = (req,res) => {
  res.render('dashbord');
}
module.exports ={
 loginHandler,
 loginAdmin,
 dashbordHandler,
};
