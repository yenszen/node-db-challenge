const express = require("express");
const db = require("./project-model");

const router = express.Router();

// GET requests
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

// POST requests
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
      res.status(500).json({
        message:
          "Please include task description and ensure project ID is valid"
      });
    });
});

// PUT requests - STRETCH
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.updateProject(id, changes)
    .then(count => {
      if (count) {
        res.status(200).json({ updated: count });
      } else {
        res
          .status(404)
          .json({ message: "Project with specified ID does not exist" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Could not update database" });
    });
});

router.put("/all/tasks/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.updateTask(id, changes)
    .then(count => {
      if (count) {
        res.status(200).json({ updated: count });
      } else {
        res
          .status(404)
          .json({ message: "Task with specified ID does not exist" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Could not update database" });
    });
});

// DELETE requests - STRETCH
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.removeProject(id)
    .then(count => {
      if (count) {
        res.status(200).json({ removed: count });
      } else {
        res
          .status(404)
          .json({ message: "Project with specified ID does not exist" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Could not remove from database" });
    });
});

router.delete("/all/tasks/:id", (req, res) => {
  const { id } = req.params;

  db.removeTask(id)
    .then(count => {
      if (count) {
        res.status(200).json({ removed: count });
      } else {
        res
          .status(404)
          .json({ message: "Task with specified ID does not exist" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Could not remove from database" });
    });
});

module.exports = router;
