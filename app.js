const express = require("express");
const routes = require("express").Router();
const app = express();
const tasksController = require("./src/controllers/tasksController");
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

routes.use("/tasks", tasksController);
app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
