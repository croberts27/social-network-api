//require express
const router = require("express").Router();

//require routes
const thoughtRoutes = require("./thought-routes");
const userRoutes = require("./user-routes");

// use routes
router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);

module.exports = router;
