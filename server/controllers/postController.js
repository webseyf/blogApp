const Post = require('../models/Post');
const fs = require('fs');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? req.file.path : null; // Ensure req.file is properly accessed

    // Ensure title, content, and image are provided
    if (!title || !content || !image) {
      return res.status(400).json({ message: 'Title, content, and image are required.' });
    }

    const newPost = new Post({
      title,
      content,
      image,
      userId: req.user.id, // Assuming you attach user ID in authMiddleware
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error while creating the post.' });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('userId', 'username'); // Populate user info
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error getting posts:', error);
    res.status(500).json({ message: 'Server error while fetching posts.' });
  }
};

// Get a post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('userId', 'username');
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Error getting post by ID:', error);
    res.status(500).json({ message: 'Server error while fetching the post.' });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    // Check if the user is the owner of the post
    if (post.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this post.' });
    }

    // Update title, content, and image if provided
    post.title = title || post.title;
    post.content = content || post.content;
    if (req.file) {
      // Delete the old image file if new image is uploaded
      if (post.image) {
        fs.unlink(post.image, (err) => {
          if (err) console.error('Error deleting old image:', err);
        });
      }
      post.image = req.file.path; // Update image path
    }

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Server error while updating the post.' });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    // Check if the user is the owner of the post
    if (post.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this post.' });
    }

    // Delete the image file if it exists
    if (post.image) {
      fs.unlink(post.image, (err) => {
        if (err) console.error('Error deleting image:', err);
      });
    }

    await post.remove();
    res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Server error while deleting the post.' });
  }
};
