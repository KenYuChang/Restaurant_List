const express = require("express");
const router = express.Router();

const Restaurant = require("../../models/Restaurant");

// 搜尋特定餐廳
router.get("/search", (req, res) => {
  const userId = req.user._id;
  if (!req.query.keywords) {
    res.redirect("/");
  }

  const keywords = req.query.keywords;
  const keyword = req.query.keywords.trim().toLowerCase();

  Restaurant.find({ userId })
    .lean()
    .then((restaurantsData) => {
      const filterRestaurantsData = restaurantsData.filter(
        (data) =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      );
      res.render("index", { restaurantsData: filterRestaurantsData, keywords });
    })
    .catch((err) => console.log(err));
});

// 新增餐廳頁面
router.get("/new", (req, res) => {
  res.render("new");
});

// 瀏覽特定餐廳
router.get("/:restaurantId", (req, res) => {
  const _id = req.params.restaurantId;
  const userId = req.user._id;
  Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurantData) => res.render("show", { restaurantData }))
    .catch((err) => console.log(err));
});

// 新增餐廳
router.post("/", (req, res) => {
  const userId = req.user._id;
  const restaurantData = {
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
    userId: userId,
  };
  Restaurant.create({ ...restaurantData })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

// 編輯餐廳頁面
router.get("/:restaurantId/edit", (req, res) => {
  //必須用_id，不可以更改用別的名稱
  const _id = req.params.restaurantId;
  const userId = req.user._id;
  Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((err) => console.log(err));
});

// 更新餐廳
router.put("/:restaurantId", (req, res) => {
  const _id = req.params.restaurantId;
  const userId = req.user._id;
  // 需設定useFindAndModify: false 才能使用findOneAndUpdate
  Restaurant.findOneAndUpdate({ _id, userId }, req.body)
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch((err) => console.log(err));
});

// 刪除餐廳
router.delete("/:restaurantId", (req, res) => {
  const _id = req.params.restaurantId;
  const userId = req.user._id;
  // 需設定useFindAndModify: false 才能使用findOneAndDelete
  Restaurant.findOneAndDelete({ _id, userId })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
