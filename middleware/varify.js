const res = require('express/lib/response');
const jwt = require('jsonwebtoken');

const varifier = async (token,next) => {
 const varify = await jwt.verify(token,process.env.SECRET);
 return varify;
};
const authrozior = async(req,res,next) => {
 if(req.cookies.jwt){
 const authroztion = await varifier(req.cookies.jwt);
 if(authroztion)next();
 }else{
  res.redirect('/');
 }
};
const isAuth = async (req,res,next) => {
 if(req.cookies.jwt){
 const isAuth = await varifier(req.cookies.jwt);
 isAuth ? res.redirect('/dashbord'):next();
 }else{
  next();
 }
}
module.exports ={
authrozior,
isAuth,
};