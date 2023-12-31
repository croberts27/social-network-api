const express = require("express");
const db = require("./config/connection.js");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(routes);

db.on("error", (error) => {
  console.error("Error connecting to MongoDB:", error);
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Social Network API is running on port ${PORT}!`);
  });
});
