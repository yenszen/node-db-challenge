const db = require("../data/db-config");

// GET functions
function getProjects() {
  return db("projects");
}

function getResources() {
  return db("resources");
}

function getTasks() {
  return db("tasks as t")
    .join("projects as p", "t.project_id", "p.id")
    .select(
      "t.*",
      "p.name as project_name",
      "p.description as project_description"
    );
}

// POST functions
function addProject(project) {
  return db("projects").insert(project);
}

function addResource(resource) {
  return db("resources").insert(resource);
}

function addTask(id, task) {
  return db("tasks").insert({ project_id: id, ...task });
}

// PUT functions
function updateProject(id, changes) {
  return db("projects")
    .where({ id })
    .update(changes);
}

function updateTask(id, changes) {
  return db("tasks")
    .where({ id })
    .update(changes);
}

// DELETE functions
function removeProject(id) {
  return db("projects")
    .where({ id })
    .del();
}

function removeTask(id) {
  return db("tasks")
    .where({ id })
    .del();
}

module.exports = {
  getProjects,
  getResources,
  getTasks,
  addProject,
  addResource,
  addTask,
  updateProject,
  updateTask,
  removeProject,
  removeTask
};
