import "dotenv/config"; // Automatically loads environment variables from .env file
import express from 'express';


import authRoutes from './routes/auth.route.js'; // Importing the auth routes



const app = express();
const PORT = process.env.PORT || 5000; // Use PORT from .env or default to 5000

// Middleware
app.use(express.json());
app.use("/api/auth", authRoutes); // Use the auth routes under the /api/auth path


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});