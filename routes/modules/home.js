const express = require("express");
const router = express.Router();
const Todo = require("../../models/todo");

router.get("/", (req, res) => {
  Todo.find() //取出todo所有資料
    .lean() //不需要mongoose的module
    .sort({ _id: "asc" }) // desc (倒序)
    .then((todos) => res.render("index", { todos })) //資料傳給前端樣板
    .catch((error) => console.log(error)); //錯誤處理
});
module.exports = router;
