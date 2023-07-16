//require express router
const router = require("express").Router();
//require all api routes
const apiRoutes = require("./api");
// addes '/api' to all route endpoints
router.use("/api", apiRoutes);

router.use((req, res) => {
  res.status(404).send("Wrong route!");
});

module.exports = router;
