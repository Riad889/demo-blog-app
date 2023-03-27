import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { authActions } from "../storage/redux_work";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
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
      .post("http://localhost:5000/signup", {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
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
    sendData()
      .then((data) => localStorage.setItem("userId", data.userId))
      .then(dispatch(authActions.login()));
    navigate("/blogs");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          alignItems="center"
          margin={"auto"}
          marginTop={5}
          maxWidth={400}
          borderRadius={5}
        >
          <Typography variant="h3" padding={3} textAlign="center">
            SignUp
          </Typography>
          <TextField
            name={"name"}
            required
            fullWidth
            autoFocus
            onChange={handleChange}
            placeholder="Name"
            margin="normal"
          />
          <TextField
            name={"email"}
            required
            fullWidth
            autoFocus
            onChange={handleChange}
            type={"email"}
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name={"password"}
            required
            fullWidth
            autoFocus
            onChange={handleChange}
            placeholder="Password"
            type={"password"}
            margin="normal"
          />
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="warning"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default SignUp;
