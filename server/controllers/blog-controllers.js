const { default: mongoose } = require("mongoose");
const Blog = require("../models/BlogSchema");
const User = require("../models/user");
const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().populate('user');
   //console.log(blogs);
    if (!blogs) {
      return res.status(404).json({ message: "No Blog found" });
    } else {
      return res.status(202).json({ blogs });
    }
  } catch (error) {
    console.log(error);
  }
};
const addBlogs = async (req, res, next) => {
  const { title, description, image_url, user } = req.body;
  if (!title || !description || !image_url || !user) {
    return res.status(404).json({ message: "Please fill all the field" });
  } else {
    try {
      const existingUser = await User.findById(user);
      if (existingUser) {
        const blog = new Blog({
          title,
          description,
          image_url,
          user,
        });
        try {
          const session = await mongoose.startSession();
          session.startTransaction();
          await blog.save({ session });
          existingUser.blogs.push(blog);
          await existingUser.save({ session });
          await session.commitTransaction();
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: error });
        }
        // await blog.save();
        res.status(202).json({ message: "Blog is created successfully" });
      } else {
        return res.status(400).json({ message: "Unable to find User" });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  try {
    const blog = await Blog.findByIdAndUpdate(blogId, {
      title: title,
      description: description,
    });
    if (!blog) {
      return res.status(500).json({ message: "Unable to Update" });
    } else {
      return res.status(200).json({ message: "Blog Updated Successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};
const get_blogsId = async (req, res, next) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id);
    if (blog) {
      return res.status(200).json({ blog });
    } else {
      res.status(404).json({ message: "Blog doesn't exist" });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  //console.log(id);
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (error) {
    console.log(error);
  }
  if (blog) {
    return res.status(202).json({ message: "Delete Successfully" });
  } else {
    return res.status(404).json({ message: "Deletion failed" });
  }
};

const getByUserId = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user_blog = await User.findById(id).populate("blogs");
    if (user_blog) {
      return res.status(202).json({ user: user_blog });
    } else {
      res.status(404).json({ message: "There is no blog" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllBlogs,
  addBlogs,
  updateBlog,
  get_blogsId,
  deleteBlog,
  getByUserId,
};
