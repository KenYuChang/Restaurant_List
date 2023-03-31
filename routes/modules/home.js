const express = require("express");
const router = express.Router();

const Restaurant = require("../../models/Restaurant");

router.get("/", (req, res) => {
  Restaurant.find({})
    .lean()
    .then((restaurantsData) => res.render("index", { restaurantsData }))
    .catch((err) => console.log(err));
});

module.exports = router;
