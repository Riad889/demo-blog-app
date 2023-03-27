import axios from "axios";
import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";

const UserBlogs = () => {
  const id = localStorage.getItem("userId");
  //const [blogs, setBlogs] = useState();
  const [usersBlog, setUsersBlog] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/user/${id}`)
      .catch((error) => {
        console.log(error);
      });
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUsersBlog(data.user));
  }, []);
 // console.log(usersBlog);
  return (
    <div>
      {usersBlog &&
        usersBlog.blogs &&
        usersBlog.blogs.map((blog, index) => (
          <BlogCard
            isUser={true}
            key={index}
            title={blog.title}
            blogId={blog._id}
            description={blog.description}
            image={blog.image_url}
            userName={usersBlog.name}
            userId={localStorage.getItem("userId")}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
