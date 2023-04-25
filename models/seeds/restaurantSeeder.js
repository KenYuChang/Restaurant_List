const bcrypt = require("bcryptjs");
const db = require("../../config/mongoose");
const Restaurant = require("../Restaurant");
const restaurantList = require("../../restaurant.json").results;
const User = require("../user");
const SEED_USER = [
  {
    name: "user1",
    email: "user1@example.com",
    password: "12345678",
    restaurantIndex: [0, 1, 2],
  },
  {
    name: "user2",
    email: "user2@example.com",
    password: "12345678",
    restaurantIndex: [3, 4, 5],
  },
];
db.once("open", () => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER[0].password, salt))
    .then((hash) => {
      return Promise.all(
        Array.from({ length: SEED_USER.length }, (_, i) =>
          User.create({
            name: SEED_USER[i].name,
            email: SEED_USER[i].email,
            password: hash,
          })
        )
      );
    })
    .then((users) => {
      const userId = users.map((user) => user._id);
      const restaurants = [];
      Array.from(SEED_USER, (user, index) => {
        Array.from(user.restaurantIndex, (index) => {
          const restaurant = {
            ...restaurantList[index],
            userId: userId[SEED_USER.indexOf(user)],
          };
          restaurants.push(restaurant);
        });
      });
      return Promise.all(
        Array.from({ length: restaurants.length }, (_, i) =>
          Restaurant.create(restaurants[i])
        )
      );
    })
    .then(() => {
      console.log("Seeder done.");
      process.exit();
    })
    .catch((err) => console.log(err));
});
