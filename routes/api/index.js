//require express
const router = require("express").Router();

//require routes
const thoughtRoutes = require("./thoughtRoutes");
const userRoutes = require("./userRoutes");

// use routes
router.use("/thought", thoughtRoutes);
router.use("/user", userRoutes);

module.exports = router;
