// routes/postRoutes.js
const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../controllers/postController');

const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the destination for uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Rename the file to avoid naming conflicts
  },
});

const upload = multer({ storage });

const fs = require('fs');

// Ensure uploads directory exists
if (!fs.existsSync('uploads/')) {
fs.mkdirSync('uploads/');
}

// Protect routes with the auth middleware
router.post('/', authMiddleware, upload.single('image'), createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', authMiddleware, upload.single('image'), updatePost); // Protect update route
router.delete('/:id', authMiddleware, deletePost); // Protect delete route

module.exports = router;
