import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/blog/blog")
      .catch((error) => console.log(error));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
  //console.log(blogs);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <BlogCard
          key={index}
            //isUser={localStorage.getItem("userId") === blogs.user._id}
            title={blog.title}
            description={blog.description}
            image={blog.image_url}
            userName={blog.user.name}
          />
        ))}
    </div>
  );
};

export default Blogs;
