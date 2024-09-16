const express = require("express");
const feedRoutes = require("./routes/feed");

const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    res.setHeader('Access-Control-Allow-hEADERS', 'Content-Type, Authorization');
})
app.use("/feed", feedRoutes);
app.listen(8080);