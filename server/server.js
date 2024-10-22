require("dotenv").config();
require('express-async-errors');
const path = require('path');
const connectDB = require("./db/connect");
const express = require("express");
const cors = require('cors');
const app = express();

// Import routes
const mainRouter = require("./routes/user");
const postRoutes = require("./routes/postRoutes"); // Import post routes

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route handling
app.use("/api/v1", mainRouter);
app.use('/api/posts', postRoutes); // Register post routes

// Error handling middleware
const errorMiddleware = require("./middleware/errorMiddleware");
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`backend connected and Server is listening on port ${port}`);
        });
    } catch (error) {
        console.log(error); 
    }
}

start();
