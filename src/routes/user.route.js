import express from 'express';

// Importing necessary modules and functions
import { getRecommendedUsers, getFriendsList, sendFriendRequest, acceptFriendRequest } from '../controllers/user.controller.js'; // Importing user controller functions
import { protectRoute } from '../middleware/auth.middleware.js'; // Importing authentication middleware


const router = express.Router(); // Creating a new router instance
router.use(protectRoute); // Protect all routes with authentication middleware


router.get("/", getRecommendedUsers); // Get recommended users for the logged-in user
router.get("/friends", getFriendsList);// Get the friends list of the logged-in user
router.get("/sent-requests/:id", sendFriendRequest); // Send a friend request to a user by ID
router.put("/accept-request/:id", acceptFriendRequest); // Accept a friend request from a user by ID





export default router;
