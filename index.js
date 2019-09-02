const express = require("express");

const server = express();

server.use(express.json());

const project = [];
let cont = 0;

//middleware global para contagem das requiscao
function contador(req, res, next) {
  cont++;
  console.log(`contado: ${cont}`);
  next();
}

server.use(contador);

//middleware de verificacao de existencia do produto
function checkExist(req, res, next) {
  const { id } = req.params;
  let exist = project.find(ext => ext.id == id);

  if (!exist) {
    res.status(400).json({ error: "nao existe" });
  }
  return next();
}

function checkProjectArray(req, res, next) {
  const { id } = req.params;
  const projc = project[req.params.id];

  let exist = project.find(ext => ext.id == id);

  if (!exist) {
    return res.status(400).json({ error: "user does not exists" });
  }

  req.project = projc;

  return next();
}

//funcao de iniciacao do projeto
server.get("/projects", (req, res) => {
  return res.json(project);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project_desc = {
    id,
    title,
    task: []
  };
  project.push(project_desc);

  return res.json(project);
});

server.put("/projects/:id", checkExist, checkProjectArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const proj = project.find(put => put.id == id);

  proj.title = title;

  return res.json(proj);
});

server.delete("/projects/:id", checkProjectArray, (req, res) => {
  const { id } = req.params;

  let delproject = project.find(del => del.id == id);

  project.splice(delproject, 1);

  return res.json(project);
});

//funcao de adicionamento do task
server.post("/projects/:id/tasks", checkProjectArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  let taskproject = project.find(taskproj => taskproj.id == id);

  taskproject.task.push(title);

  return res.json(taskproject);
});

server.put("/projects/:id");

server.listen(3000);
