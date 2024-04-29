const express = require("express");
const tasks = require("express").Router();
const taskData = require("../../task.json");
const Validator = require("../helpers/validator");
const fs = require("fs");

tasks.use(express.json());

tasks.get("/", (req, res) => {
  if (taskData) {
    return res.status(200).send(taskData.tasks);
  } else {
    return res.status(500).json({ error: "No data found" });
  }
});

tasks.get("/:id", (req, res) => {
  let taskList = taskData?.tasks;
  let { id: taskId } = req.params;
  if (taskList) {
    const task = taskList.find((task) => task.id === Number(taskId));
    if (task) {
      return res.status(200).json(task);
    } else {
      res.status(404).json({ error: "Invalid task" });
    }
  }
  return res.status(500).json({ error: "No data found" });
});

tasks.post("/", (req, res) => {
  const userProvidedDetails = req.body;
  const isValidated = Validator.validateTaskInfo(userProvidedDetails);

  if (isValidated.status === true) {
    const latestId = taskData.tasks.length;
    const { title, description, completed } = userProvidedDetails;
    let taskDataModified = taskData;
    taskDataModified.tasks.push({
      id: latestId + 1,
      title,
      description,
      completed,
    });

    fs.writeFile(
      "task.json",
      JSON.stringify(taskDataModified),
      { encoding: "utf8", flag: "w" },
      (err, data) => {
        if (err) {
          return res
            .status(500)
            .send("Something went wrong while creating the task");
        } else {
          taskData.tasks = taskDataModified.tasks;
          return res.status(201).send("Successfully created the task");
        }
      }
    );
  } else {
    let message = isValidated.message;
    return res.status(400).send(message);
  }
});

tasks.put("/:id", (req, res) => {
  let taskList = taskData?.tasks;
  let { id: taskId } = req.params;
  if (taskList) {
    const task = taskList.find((task) => task.id === Number(taskId));
    if (task) {
      const userProvidedDetails = req.body;
      const isValidated = Validator.validateTaskInfo(userProvidedDetails);
      if (isValidated.status === true) {
        const { title, description, completed } = userProvidedDetails;
        let taskDataModified = taskData;
        taskDataModified.tasks = taskDataModified.tasks.map((element, idx) => {
          if (element.id === Number(taskId)) {
            element = {
              id: element.id,
              title,
              description,
              completed,
            };
          }
          return element;
        });

        fs.writeFile(
          "task.json",
          JSON.stringify(taskDataModified),
          { encoding: "utf8", flag: "w" },
          (err, data) => {
            if (err) {
              return res
                .status(500)
                .send("Something went wrong while updating the task");
            } else {
              taskData.tasks = taskDataModified.tasks;
              return res.status(200).send("Successfully updated the task");
            }
          }
        );
      } else {
        let message = isValidated.message;
        return res.status(400).send(message);
      }
    } else {
      res.status(404).json({ error: "Invalid task" });
    }
  } else {
    return res.status(500).json({ error: "No data found" });
  }
});

tasks.delete("/:id", (req, res) => {
  let taskList = taskData?.tasks;
  let { id: taskId } = req.params;
  if (taskList) {
    const task = taskList.find((task) => task.id === Number(taskId));
    if (task) {
      let taskDataModified = taskData;
      taskDataModified.tasks = taskDataModified.tasks.filter(
        (element) => element.id !== Number(taskId)
      );

      fs.writeFile(
        "task.json",
        JSON.stringify(taskDataModified),
        { encoding: "utf8", flag: "w" },
        (err, data) => {
          if (err) {
            return res
              .status(500)
              .send("Something went wrong while deleting the task");
          } else {
            taskData.tasks = taskDataModified.tasks;
            return res.status(200).send("Successfully deleted the task");
          }
        }
      );
    } else {
      res.status(404).json({ error: "Invalid task" });
    }
  } else {
    return res.status(500).json({ error: "No data found" });
  }
});

module.exports = tasks;
