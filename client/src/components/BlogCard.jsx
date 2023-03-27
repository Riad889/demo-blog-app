import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BlogCard = ({
  title,
  description,
  image,
  userName,
  isUser,
  userId,
  blogId,
}) => {
  //console.log("image = ",image);
  // console.log("title = ", title);
  // console.log("description = ", description);
  // console.log("userName = ", userName);
  const navigate = useNavigate();
  if (isUser !== true) {
    isUser = false;
  }

  //console.log("isUser = ", isUser);
  const deleteData = async () => {
    const res = await axios.delete(`http://localhost:5000/api/blog/${blogId}`);
    const data = await res.data;
    return data;
  };
  const handleDelete = (e) => {
    deleteData()
      .then(() => navigate("/blogs"))
      .then(() => navigate("/myBlogs"));
  };
  const handleEdit = (e) => {
    navigate(`/myBlogs/${blogId}`);
  };
  return (
    <Card
      sx={{
        width: "40%",
        margin: "auto",
        marginTop: 2,
        padding: 2,
        boxShadow: "5px  5px 10px #ccc",
        ":hover": {
          boxShadow: "5px  5px 5px #ccc",
        },
      }}
    >
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <ModeEditOutlineIcon color="warning" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteForeverIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red[500]" }} aria-label="recipe">
            {userName}
          </Avatar>
        }
        title={title}
      />
      <CardMedia component="img" height="194" image={image} alt="image" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
