const express = require("express");
const blog_router = express.Router();
const {
  getAllBlogs,
  addBlogs,
  updateBlog,
  get_blogsId,
  deleteBlog,
  getByUserId,
} = require("../controllers/blog-controllers");


// now declare the blog path

blog_router.get("/blog", getAllBlogs);

blog_router.post('/addBlogs',addBlogs);

blog_router.put('/updateBlog/:id',updateBlog);

//getblogs using id

blog_router.get('/:id',get_blogsId);

//delete a blog

blog_router.delete("/:id",deleteBlog);

blog_router.get("/user/:id",getByUserId);

module.exports=blog_router;
