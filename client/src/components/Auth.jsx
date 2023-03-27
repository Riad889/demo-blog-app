import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../storage/redux_work";
import { useDispatch } from "react-redux";
const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setSignUp] = useState(false);
  const [inputs, setInputs] = useState({
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
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/login", {
        email: inputs.email,
        password: inputs.password,
      })
      .catch((error) => {
        console.log(error);
      });

    const data = await res.data;
   // console.log(data.userId);
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(inputs);
    sendRequest()
      .then((data) => localStorage.setItem("userId", data.userId))
      .then(() => dispatch(authActions.login()))
      .then(() => navigate("/blogs"));
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
            Login
          </Typography>

          <TextField
            type={"email"}
            required
            fullWidth
            autoFocus
            name="email" //it is the identifier
            onChange={handleChange}
            value={inputs.email}
            placeholder="Email"
            margin="normal"
            autoComplete="email"
          />
          <TextField
            placeholder="Password"
            name="password" //it is the identifier
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            margin="normal"
            required
            fullWidth
            autoFocus
          />
          <Box display={"flex"} marginLeft={"auto"}>
            <Typography variant="h7">Forget Password?</Typography>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="warning"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Submit
          </Button>
          <Button
            LinkComponent={Link}
            to="/signup"
            sx={{ borderRadius: 3, marginTop: 2 }}
            onChange={() => {}}
          >
            SignUp
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
