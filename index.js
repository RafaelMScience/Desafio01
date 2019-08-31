const express = require("express");

const server = express();

server.use(express.json());

const project = [];
const task = [];

server.post("/projects", (req, res) => {
  const { id, title, task } = req.body;

  project.push(id, title, task);

  return res.json(project);
});

server.listen(3000);
