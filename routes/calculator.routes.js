const router = require("express").Router()

router.get("/calculus", async (req, res)=>{
    try {
        res.status(200).json("calculus")
    }catch (e) {
        res.status(500).json(e)
    }
})

module.exports = router;