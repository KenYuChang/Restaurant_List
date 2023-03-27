const express = require("express");
const router = express.Router();
const Todo = require("../../models/todo");

router.get("/new", (req, res) => {
  return res.render("new");
});
router.post("/", (req, res) => {
  const name = req.body.name; //從req.body拿出表單裡的name
  return Todo.create({ name }) //存入資料庫 //直接命令mongoose不需要在伺服器建立實體
    .then(() => res.redirect("/")) //導回首頁
    .catch((error) => console.log("error"));
});
router.get("/:id", (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render("detail", { todo }))
    .catch((error) => console.log(error));
});
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render("edit", { todo }))
    .catch((error) => console.log(error));
});
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, isDone } = req.body; // const name = req.body.name && const isDone = req.body.isDone
  return Todo.findById(id)
    .then((todo) => {
      todo.name = name;
      todo.isDone = isDone === "on"; // 判斷true/ false
      return todo.save();
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch((error) => console.log(error));
});
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;
