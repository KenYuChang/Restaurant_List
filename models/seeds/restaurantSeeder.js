const mongoose = require("mongoose");
const db = require("../../config/mongoose");
const Restaurant = require("../Restaurant");
const restaurantList = require("../../restaurant.json").results;

db.once("open", () => {
  Restaurant.create(restaurantList)
    .then(() => {
      console.log("seed created!");
      db.close();
    })
    .catch((error) => console.log(error));
});
