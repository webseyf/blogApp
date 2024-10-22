import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import "../styles/PostDelete.css"; // Import CSS for styling

const PostDelete = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [token] = useState(JSON.parse(localStorage.getItem("auth")) || "");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching the post:', error);
        toast.error('Failed to fetch the post.');
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    let axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(`http://localhost:3000/api/posts/${id}`, axiosConfig);
      toast.success("Post deleted successfully!");
      navigate("/dashboard"); // Redirect to dashboard after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Error deleting post: ' + (error.response?.data?.message || error.message));
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="post-delete">
      <h1>Are you sure you want to delete this post?</h1>
      <h2>{post.title}</h2>
      <p>{post.content.substring(0, 100)}...</p>
      <div className="delete-actions">
        <button onClick={handleDelete} className="delete-button">Yes, Delete</button>
        <button onClick={() => navigate('/dashboard')} className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default PostDelete;
