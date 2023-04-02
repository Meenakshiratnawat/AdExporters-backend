const express= require("express");
const router = express.Router();

const{ getUserById, getUser,updateUser,userPurchaseList}  = require("../controllers/user");
const{isSignedIn,isAuthenticated,isAdmin}= require("../controllers/auth");


router.param("userId",getUserById); //middlewear


//whenver there will be a colon : that means it is a user id and now we need to get user byid
router.get("/user/:userId",isSignedIn,isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.get("/orders/user/:userId", isSignedIn, isAuthenticated,userPurchaseList);

module.exports = router;


