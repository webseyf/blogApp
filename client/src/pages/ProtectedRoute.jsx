import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const PostDetails = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [token] = useState(JSON.parse(localStorage.getItem("auth")) || "");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        toast.error("Error fetching post: " + error.message);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      let axiosConfig = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:3000/api/posts/${id}`, axiosConfig);
      toast.success('Post deleted successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Error deleting post: ' + error.message);
    }
  };

  return (
    <div className="post-details">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <div className="post-actions">
        <Link to={`/posts/edit/${post._id}`}>Edit</Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default PostDetails;
