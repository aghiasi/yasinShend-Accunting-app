const router = require('express').Router();
const {loginHandler,loginAdmin,dashbordHandler} = require('../controller/controller')
const {authrozior,isAuth} = require('../middleware/varify');
router.get('/',isAuth,loginHandler);
router.post('/loginAdmin',loginAdmin)
router.get('/dashbord',authrozior,dashbordHandler);


module.exports = router;