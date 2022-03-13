const {calculusHandler} = require("../controllers/calculus.controllers");
const router = require("express").Router()


router.get("/calculus", calculusHandler)

module.exports = router;