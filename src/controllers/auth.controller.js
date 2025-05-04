import { upsertStreamUser } from '../lib/stream.js';
import User from '../models/User.js'; // Adjust the import based on your project structure
import jwt from 'jsonwebtoken'; // Importing JWT library


// This function handles user signup
export async function signup(req, res) {
    const { email, password, name } = req.body;
    // Here you would typically hash the password and save the user to the database
    try {
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        // Check if user already exists (not implemented here)
        const userExists = await User.findOne({ email });
        // Simulate a database check for existing user  
        if (userExists) {
            return res.status(400).json({ message: 'User already exists, Use a different Email' });
        }

        const idx = Math.floor(Math.random() * 100) + 1; // Simulate a unique ID for the user
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`; // Simulate a random avatar URL


        const newUser = await User.create({
            email,
            password,
            name,
            profilePicture: randomAvatar, // Assign the random avatar URL
        });

        try {
            await upsertStreamUser({
                id: newUser._id.toString(), // Convert ObjectId to string
                name: newUser.name,
                image: newUser.profilePicture || "", // Use the random avatar URL
            }); // Upsert the user in StreamChat
            console.log(`User ${newUser.name} upserted in Stream successfully`); // Log success message


        } catch (error) {
            console.error("Error upserting user in Stream", error); // Log the error   
        }




        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate a JWT token
        res.cookie('jwt', token, {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 3600000, // 1 hour in milliseconds
            sameSite: 'Strict', // CSRF protection
        }); // Set the cookie with the token

        // Save newUser to the database (not implemented here)
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: newUser, // Return the new user object
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error in signup controller', error });
    }
}

// This function handles user login
export async function login(req, res) {
    try {
        const { email, password } = req.body; // Destructure email and password from request body

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user exists (not implemented here)
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if password is correct (not implemented here)
        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate a JWT token
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
            sameSite: 'Strict',
        }); // Set the cookie with the token

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user, // Return the user object
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error in login controller', error });
    }
}

// This function handles user logout
export function logout(req, res) {
    res.clearCookie('jwt', { httpOnly: true, secure: process.env.NODE_ENV === 'production' }); // Clear the cookie
    res.status(200).json({ success: true, message: 'Logout successful' }); // Send a response indicating successful logout
}   