import express from 'express';
import { signup, login, logout } from '../controllers/auth.controller.js'; // Importing the auth controller functions



const router = express.Router();

router.get('/signup', signup); // Route for signup
router.get('/login', login); // Route for login 
router.get('/logout', logout); // Route for logout



export default router;
// This code defines a simple Express router for authentication routes. It includes three routes: signup, login, and logout. Each route sends a response indicating which route was accessed. The router is then exported for use in other parts of the application.
