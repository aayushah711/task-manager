const express = require("express");
const tasks = require("express").Router();
const taskData = require("../../task.json");
tasks.use(express.json());

tasks.get("/", (req, res) => {
  if (taskData) {
    return res.status(200).json({ data: taskData });
  } else {
    return res.status(500).json({ error: "No data found" });
  }
});

module.exports = tasks;
