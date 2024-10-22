import React from 'react';
import PostForm from './PostForm';
import '../styles/CreatePost.css'; // Import your styles

const CreatePost = () => {
  return (
    <div className="create-post-container">
      <h1>Create a New Post</h1>
      <PostForm />
    </div>
  );
};

export default CreatePost;
