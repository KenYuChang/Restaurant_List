// require packages used in the project
const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const userPassport = require("./config/passport");
const routes = require("./routes");
require("./config/mongoose");

const app = express();
const port = 3000;

//setting template engine 設置樣版引擎
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    useFindAndModify: false,
  })
);

userPassport(app); //呼叫passport

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg"); // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash("warning_msg"); // 設定 warning_msg 訊息
  next();
});
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(routes); // express routes

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
