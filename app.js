const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const feedRoutes = require("./routes/feed");

const app = express();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()} - ${file.originalname}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") cb(null, true);
  else cb(null, false);
};

app.use(bodyParser.json()); 
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    res.setHeader('Access-Control-Allow-hEADERS', 'Content-Type, Authorization');
    next();
})
app.use("/feed", feedRoutes);
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});
mongoose
  .connect("mongodb+srv://swapnil:swapnil@cluster0.pq6s4.mongodb.net/messages?retryWrites=true&w=majority&appName=Cluster0")
  .then((result) => app.listen(8080))
  .catch((error) => console.log(error));
