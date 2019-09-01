const express = require("express");

const server = express();

server.use(express.json());

const project = [];
let cont = 0;

function checkExist(req, res, next) {
  const { id } = project[req.params.id];

  if (project[req.params.id]) {
    return res.status(400).json({ erro: "id ja existe" });
  }

  return next();
}

server.post("/projects", checkExist, (req, res) => {
  const { id, title } = req.body;

  const project_desc = {
    id,
    title,
    task: []
  };
  project.push(project_desc);

  return res.json(project);
});

server.listen(3000);
