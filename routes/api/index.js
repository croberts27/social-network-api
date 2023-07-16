//require express
const router = require("express").Router();

//require routes
const thoughtRoutes = require("./thoughtRoutes");
const userRoutes = require("./userRoutes");

// use routes
router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);

module.exports = router;
