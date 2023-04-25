const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const passport = require("passport");
const bcrypt = require("bcryptjs");

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

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "你已經成功登出。");
  res.redirect("/users/login");
});
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  // 取得表單參數
  const { name, email, password, confirmPassword } = req.body;
  const errors = [];
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: "所有欄位都是必填。" });
  }
  if (password !== confirmPassword) {
    errors.push({ message: "密碼與確認密碼不相符！" });
  }
  if (errors.length) {
    return res.render("register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  }
  // 檢查是否註冊
  User.findOne({ email })
    .then((user) => {
      if (user) {
        errors.push({ message: "這個 Email 已經註冊過了。" });
        res.render("register", {
          name,
          email,
          password,
          confirmPassword,
        });
      }
      return bcrypt
        .genSalt(10) //複雜係數10
        .then((salt) => bcrypt.hash(password, salt)) //加鹽，產生雜湊
        .then((hash) =>
          User.create({
            name,
            email,
            password: hash, //雜湊取代原本密碼
          })
        )
        .then(() => res.redirect("/"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
