const {calculusHandler} = require("../controllers/calculus.controllers");
const validateQuery = require("../middlewares/validateResource");
const router = require("express").Router();


router.get("/calculus", validateQuery, calculusHandler);

module.exports = router;