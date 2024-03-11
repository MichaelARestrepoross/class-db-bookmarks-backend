const express = require("express");

const bookmarks = express.Router();
const { getAllBookmarks } = require('../queries/bookmarks')

bookmarks.get("/", async (req, res) => {
  const allBookmarks = await getAllBookmarks()
  if(allBookmarks[0]){
    res.status(200).json(allBookmarks)
  }else{
    res.status(500).json({ error: 'server error' })
  }
});

bookmarks.get("/:id", (req, res) => {
  const { id } = req.params;

  res.json({ message: `Get by id:${id} router` });
});

bookmarks.post("/", (req, res) => {
  res.json({ message: "Post route" });
});

bookmarks.put("/:id", (req, res) => {
  const { id } = req.params;

  res.json({ message: `Update item at id: ${id}` });
});

bookmarks.delete("/:id", (req, res) => {
  const { id } = req.params;

  res.json({ message: `Delete Item based on id: ${id}` });
});

module.exports = bookmarks;
