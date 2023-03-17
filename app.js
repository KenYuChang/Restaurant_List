// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;
const restaurantList = require("./restaurant.json");
// require handlebars in the project
const exphbs = require("express-handlebars"); //載入express-handlebars
//setting template engine 設置樣版引擎
app.engine("handlebars", exphbs({ defaultLayouts: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
// routes setting
app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList.results });
});
app.get("/restaurants/:restaurant_id", (req, res) => {
  // console.log("req", req.params.restaurant_id);
  const restaurant = restaurantList.results.find(
    (restaurant) => restaurant.id == req.params.restaurant_id
  );

  res.render("show", { restaurant: restaurant });
});
app.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim();
  const restaurants = restaurantList.results.filter((restaurant) => {
    return (
      restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.includes(keyword)
    );
  });
  res.render("index", { restaurants: restaurants, keyword: keyword });
});
// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
