const express = require("express");
const router = express.Router();

const Restaurant = require("../../models/Restaurant");

router.get("/", (req, res) => {
  const userId = req.user._id;
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: "asc" })
    .then((restaurantsData) => res.render("index", { restaurantsData }))
    .catch((err) => console.log(err));
});

module.exports = router;
