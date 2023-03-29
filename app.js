const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const routes = require("./routes");
require("./config/mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
// 加入這段 code, 僅在非正式環境時, 使用 dotenv

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(routes);

app.listen(PORT, (req, res) => {
  console.log(`App is running on http://localhost:${PORT}`);
});
