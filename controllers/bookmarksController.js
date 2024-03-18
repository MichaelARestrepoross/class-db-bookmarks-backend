const express = require("express");

const bookmarks = express.Router();

const reviewsController = require('./reviewsController.js')


const { 
  getAllBookmarks,
  getBookmark, 
  createBookmark,
  deleteBookmark,
  updateBookmark,
} = require('../queries/bookmarks')

const {checkName,checkBoolean} =require("../validations/checkBookmarks")

bookmarks.use('/:bookmark_id/reviews', reviewsController)

bookmarks.get("/", async (req, res) => {
  const allBookmarks = await getAllBookmarks()
  if(allBookmarks[0]){
    res.status(200).json(allBookmarks)
  }else{
    res.status(500).json({ error: 'server error' })
  }
});

bookmarks.get("/:id", async (req, res) => {
  const { id } = req.params
  const bookmark = await getBookmark(id)
  if (bookmark) {
    res.json(bookmark)
  } else {
    res.status(404).json({ error: 'not found' })
  }
});

bookmarks.post('/', checkName,checkBoolean, async (req, res) => {
  try {
    const bookmark = await createBookmark(req.body)
    res.json(bookmark)
  } catch (error) {
    res.status(400).json({ error })
  }
})

bookmarks.put("/:id", async (req, res) => {
  const { id } = req.params;
  if(id){
    const updatedBookmark = await updateBookmark(id, req.body);
    res.status(200).json(updatedBookmark);
  }else{
    res.status(400).json({ error})
  }
});

bookmarks.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedBookmark = await deleteBookmark(id);
  if(deletedBookmark.id) {
    res.status(200).json(deletedBookmark);
  }else {
    res.status(404).json("Bookmark not found");
  }
});

module.exports = bookmarks;
