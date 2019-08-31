const express = require("express");

const server = express();

server.use(express.json());

const project = [];

server.post("/projects", (req, res) => {
  const [id] = req.body;

  project.push(id);

  return res.json(project);
});

server.listen(3000);
