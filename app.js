const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
mongoose.connect(process.env.MONGODB_URL, {
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
app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(port, (req, res) => {
  console.log(`App is running on http://localhost:${port}`);
});
