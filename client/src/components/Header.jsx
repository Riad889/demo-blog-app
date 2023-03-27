import React, { useState } from "react";
import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../storage/redux_work";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <AppBar sx={{ background: "orange", position: "sticky" }}>
      <Toolbar>
        <Typography variant="h4">TechNews</Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft={10}>
            <Tabs
              textColor="inherent"
              value={value}
              onChange={(e, value) => setValue(value)}
            >
              <Tab LinkComponent={Link} to="/blogs" label="All blogs" />
              <Tab LinkComponent={Link} to="/myBlogs" label="My blogs" />
              <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />
            </Tabs>
          </Box>
        )}

        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="/login"
                sx={{ borderRadius: 10, margin: 1 }}
                variant="contained"
                color="info"
              >
                Login
              </Button>
              <Button
                LinkComponent={Link}
                to="/signup"
                sx={{ borderRadius: 10, margin: 1 }}
                variant="contained"
                color="info"
              >
                SignUp
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              onClick={() => {
                dispatch(authActions.logout());
                navigate("/login");
              }}
              sx={{ borderRadius: 10, margin: 1 }}
              variant="contained"
              color="info"
            >
              LogOut
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
