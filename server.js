const express = require("express");
const projectRouter = require("./projects/project-router");

const server = express();

server.use(express.json());
server.use("/api/projects", projectRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
