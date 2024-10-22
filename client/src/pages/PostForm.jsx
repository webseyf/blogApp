import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../styles/PostForm.css"; // Importing the new CSS

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // State to hold the image
  const { id } = useParams(); // Get the post ID from the URL if editing
  const navigate = useNavigate();
  const [token] = useState(JSON.parse(localStorage.getItem("auth")) || "");

  useEffect(() => {
    if (id) {
      // If editing, fetch the post data
      const fetchPost = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
          setTitle(response.data.title);
          setContent(response.data.content);
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      };

      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Create a FormData object
    formData.append('title', title); // Append title
    formData.append('content', content); // Append content
    if (image) {
      formData.append('image', image); // Append the image if provided
    }

    let axiosConfig = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Set content type for FormData
      },
    };

    try {
      if (id) {
        // Update existing post
        await axios.put(`http://localhost:3000/api/posts/${id}`, formData, axiosConfig);
        toast.success("Post updated successfully!");
      } else {
        // Create new post
        await axios.post('http://localhost:3000/api/posts', formData, axiosConfig);
        toast.success("Post created successfully!");
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving post:', error); // Log the error for debugging
      toast.error('Error saving post: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="post-form">
      <h1>{id ? 'Edit Post' : 'Create Post'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} // Set the selected file
          />
        </div>
        <button type="submit">{id ? 'Update Post' : 'Create Post'}</button>
      </form>
    </div>
  );
};

export default PostForm;
