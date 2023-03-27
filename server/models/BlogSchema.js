const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "USER",
    required: true,
  },
});

const Blog=mongoose.model("Blog",blogSchema);
module.exports=Blog;