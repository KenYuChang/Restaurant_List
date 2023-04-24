// require packages used in the project
const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");
const routes = require("./routes");
require("./config/mongoose");

const app = express();
const port = 3000;

//setting template engine 設置樣版引擎
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(
  session({
    secret: "ThisIsMySecret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(routes); // express routes

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
