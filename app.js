const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const port = 3000;
const mongoose = require("mongoose");
const Todo = require("./models/todo");

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); //設定連線到mongoDB

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("mongodb connected!");
});
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  Todo.find() //取出todo所有資料
    .lean() //不需要mongoose的module
    .then((todos) => res.render("index", { todos })) //資料傳給前端樣板
    .catch((error) => console.log(error)); //錯誤處理
});
app.get("/todos/new", (req, res) => {
  return res.render("new");
});
app.post("/todos", (req, res) => {
  const name = req.body.name; //從req.body拿出表單裡的name
  return Todo.create({ name }) //存入資料庫
    .then(() => res.redirect("/")) //導回首頁
    .catch((error) => console.log("error"));
});
app.listen(port, (req, res) => {
  console.log(`App is running on http://localhost:${port}`);
});
