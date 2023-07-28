const express = require("express");
const router = express();
const userRoutes = require("./UserRoutes");
const photoRoutes = require("./PhotoRoutes");


router.use("/api/users", userRoutes);
router.use("/api/photos",photoRoutes)


// test route

router.get("/", (req,res)=> {
  res.send("API working!");
})


module.exports = router;