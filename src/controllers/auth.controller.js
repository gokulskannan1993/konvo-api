import User from '../models/User.js'; // Adjust the import based on your project structure
import jwt from 'jsonwebtoken'; // Importing JWT library

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

        // TODO: CREATE USER IN STREAM AS WELL
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

export async function login(req, res) {
    res.send('Login route');
}


export function logout(req, res) {
    res.send('Logout route');
}   