import axios from "axios";
import { InputLabel, Typography, Box, TextField, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogCard from "./BlogCard";
const labelStyle = { mt: 2, mb: 1, fontSize: "24px", fontWeight: "bold" };

const BlogDetail = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title:" ",
    description:" ",
  });

  // declare the handleChange
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, // first it will goto the name property of the textfield then gets it's value
    }));
  };

  const id = useParams().id;
  console.log(id);
  const [blog, setBlog] = useState();
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/${id}`)
      .catch((error) => {
        console.log(error);
      });
    //console.log(res);
    const data = await res.data;
    //console.log(data);
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, [id]);
  //console.log(blog);

  const updateData = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blog/updateBlog/${id}`, {
        title: inputs.title,
        description: inputs.description
      })
      .catch((error) => {
        console.log(error);
      });

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(inputs);
    updateData();
    //.then((data) => localStorage.setItem("userId", data.userId))
    //.then(dispatch(authActions.login()));
    navigate("/myBlogs");
  };

  return (
    <div>
      <form>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          boxShadow="10px 10px 20px gray"
          padding={3}
          margin={"auto"}
          marginTop={5}
          width={"80%"}
          borderRadius={5}
        >
          <Typography variant="h3" marginBottom={5}>
            Update Your Blog
          </Typography>
          <InputLabel sx={labelStyle}>Title of your blog</InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="auto"
            variant="outlined"
          />
          <InputLabel sx={labelStyle}>Add description</InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="auto"
            variant="outlined"
          />
          

          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="inherit"
            sx={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 3,
              marginTop: 3,
              width: "20%",
            }}
          >
            Save Blog
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default BlogDetail;
