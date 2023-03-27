const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router=require('../server/routes/auth')
const blog_router=require('../server/routes/blog-routes');
const app = express();

const cors=require('cors');

//cors is used to overcome the connection problem the frontend and backend
app.use(cors());

// acknowledge the server that the data is in json

app.use(express.json());

//acknowledge the server that we use a middleware

app.use(router);

//acknowledge server about blog router

app.use("/api/blog",blog_router);

//configure the dotenv file
dotenv.config({ path: "./.env" });

//declaring the port

const PORT = process.env.PORT;

//require the mongodb connection

require('./DataBase/connection');

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(PORT, () => {
  console.log(`Start successfully at 5000`);
});
