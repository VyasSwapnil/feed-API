const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const feedRoutes = require("./routes/feed");

const app = express();
app.use(bodyParser.json()); 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    res.setHeader('Access-Control-Allow-hEADERS', 'Content-Type, Authorization');
    next();
})
app.use("/feed", feedRoutes);
mongoose
  .connect("mongodb+srv://swapnil:swapnil@cluster0.pq6s4.mongodb.net/messages?retryWrites=true&w=majority&appName=Cluster0")
  .then((result) => app.listen(8080))
  .catch((error) => console.log(error));
