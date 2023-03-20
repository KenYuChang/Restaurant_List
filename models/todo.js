const mongoose = require("mongoose");
const schema = mongoose.Schema;

const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Todo", todoSchema);
