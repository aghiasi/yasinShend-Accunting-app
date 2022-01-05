const router = require("express").Router();
const {
  loginHandler,
  loginAdmin,
  dashbordHandler,
  logout,
} = require("../controller/authController");
const { authrozior, isAuth } = require("../middleware/varify");
const {
  getUser,
  createUserHandler,
  postUser,
  cartHandler,
} = require("../controller/userController");
//auth routes
router.get("/", isAuth, loginHandler);
router.post("/loginAdmin", loginAdmin);
router.get("/dashbord", authrozior, dashbordHandler);
router.get("/logout", logout);
// user routes
router.post("/createuser", authrozior, createUserHandler);
router.get("/getuser/:username", authrozior, getUser);
router.post("/getuser", authrozior, postUser);
router.get("/usercart/:username", cartHandler);
module.exports = router;
