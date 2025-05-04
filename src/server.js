import "dotenv/config"; // Automatically loads environment variables from .env file
import express from 'express'; // Importing express framework
import authRoutes from './routes/auth.route.js'; // Importing the auth routes
import connectDB from "./lib/db.js"; // Importing the database connection function
import cookieParser from 'cookie-parser'; // Importing cookie-parser middleware
import userRoutes from './routes/user.route.js'; // Importing the user routes




const app = express();
const PORT = process.env.PORT || 5000; // Use PORT from .env or default to 5000

// Middleware
app.use(cookieParser()); // Use cookie-parser middleware to parse cookies
app.use(express.json());
app.use("/api/auth", authRoutes); // Use the auth routes under the /api/auth path
app.use("/api/users", userRoutes); 

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB(); // Connect to the database when the server starts
});