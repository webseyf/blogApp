import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostDetails = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [token] = useState(JSON.parse(localStorage.getItem("auth")) || ""); // Retrieve auth token
  const [user, setUser] = useState(null); // Store user info (e.g., id, role)
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current logged-in user's info from localStorage or API
    const loggedInUser = JSON.parse(localStorage.getItem("auth"));
    setUser(loggedInUser);

    // Fetch post details
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Failed to fetch post details', error);
        toast.error('Error fetching post.');
      }
    };

    fetchPostDetails();
  }, [id]);

  // Handle post deletion
  const handleDelete = async () => {
    let axiosConfig = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(`http://localhost:3000/api/posts/${id}`, axiosConfig);
      toast.success("Post deleted successfully!");
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Error deleting post: ' + (error.response?.data?.message || error.message));
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      {post.image && <img src={`http://localhost:3000/${post.image}`} alt={post.title} />} {/* Display image */}
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      {/* Conditionally render the "Delete" button if the logged-in user is the post owner or admin */}
      {user && (user.role === 'admin' || user.id === post.authorId) && (
        <div>
          
          <button onClick={handleDelete} className="delete-button">Delete</button>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
