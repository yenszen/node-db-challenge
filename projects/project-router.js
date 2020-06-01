const express = require("express");
const db = require("./project-model");

const router = express.Router();

router.get("/", (req, res) => {
  db.getProjects()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Could not retrieve list of projects from database" });
    });
});

router.get("/all/resources", (req, res) => {
  db.getResources()
    .then(resources => {
      res.status(200).json(resources);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Could not retrieve list of resources from database"
      });
    });
});

router.get("/all/tasks", (req, res) => {
  db.getTasks()
    .then(tasks => {
      res.status(200).json(tasks);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Could not retrieve list of tasks from database" });
    });
});

router.post("/", (req, res) => {
  const postData = req.body;

  db.addProject(postData)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Please include project name" });
    });
});

router.post("/all/resources", (req, res) => {
  const postData = req.body;

  db.addResource(postData)
    .then(resource => {
      res.status(201).json(resource);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Please include resource name" });
    });
});

router.post("/:id/tasks", (req, res) => {
  const { id } = req.params;
  const postData = req.body;

  db.addTask(id, postData)
    .then(task => {
      res.status(201).json(task);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({
          message:
            "Please include task description and ensure project ID is valid"
        });
    });
});

module.exports = router;
