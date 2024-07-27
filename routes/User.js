const express=require("express");
const router=express.Router();

const{signUp}=require("../controller/Auth")
const {login}=require("../controller/Auth")

router.post("/signUp",signUp)
router.post("/login",login)


module.exports = router