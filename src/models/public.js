const mongoose = require("mongoose");

const publicSchema = new mongoose.Schema(
  {
    path: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("public", publicSchema);
