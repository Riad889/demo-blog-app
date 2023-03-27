import { InputLabel, Typography, Box, TextField,Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const labelStyle = { mt: 2, mb: 1, fontSize: "24px", fontWeight: "bold" };
const AddBlog = () => {
  const navigate=useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image_url: "",
  });

  // declare the handleChange
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, // first it will goto the name property of the textfield then gets it's value
    }));
  };
    const sendData = async () => {
      const res = await axios
        .post("http://localhost:5000/api/blog/addBlogs", {
          title: inputs.title,
          description: inputs.description,
          image_url: inputs.image_url,
          user:localStorage.getItem("userId")
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
        sendData();
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
            Post Your Blog
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
          <InputLabel sx={labelStyle}>Image Url</InputLabel>
          <TextField
            name="image_url"
            value={inputs.image_url}
            onChange={handleChange}
            margin="auto"
            variant="outlined"
          />

          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="inherit"
            
            sx={{justifyContent:"center",alignItems:"center", borderRadius: 3, marginTop: 3 ,width:"20%"}}
          >
            Save Blog
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
