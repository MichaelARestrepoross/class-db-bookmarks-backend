const express = require("express");
const cors = require("cors");

const app = express();

const bookmarksController = require("./controllers/bookmarksController.js");
// const reviewsController = require('./controllers/reviewsController.js')

app.use(cors());
app.use(express.json());

app.use("/api/bookmarks", bookmarksController);
// app.use('/api/reviews', reviewsController)

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Bookmarks App");
});

// 404 PAGE
app.get("*", (req, res) => {
  res.json({ error: "Page not found" });
});
// EXPORT
module.exports = app;
