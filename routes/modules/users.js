const express = require("express");
const router = express.Router();
const User = require("../../models/users");
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login");
});
//加入middleware驗證登入
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  // 取得表單參數
  const { name, email, password, confirmPassword } = req.body;
  // 檢查是否註冊
  User.findOne({ email })
    .then((user) => {
      if (user) {
        console.log("User already exist!");
        res.render("register", {
          name,
          email,
          password,
          confirmPassword,
        });
      } else {
        return User.create({
          name,
          email,
          password,
        })
          .then(() => res.redirect("/"))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
