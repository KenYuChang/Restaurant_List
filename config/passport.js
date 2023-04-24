const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");

module.exports = (app) => {
  //初始化passport 模組
  app.use(passport.initialize());
  app.use(passport.session());
  //設定本地登入策略
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, falsse, {
              message: "That email is not registed!",
            });
          }
          if (user.password !== password) {
            return done(null, false, {
              message: "Email or Password incorrect",
            });
          }
          return done(null, user);
        })
        .catch((err) => done(err, false));
    })
  );
  //設定反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((user, done) => {
    User.findOne(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, false));
  });
};
