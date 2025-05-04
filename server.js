import dotenv from 'dotenv';
import express from 'express';

dotenv.config(); // Load environment variables from .env file


const app = express();
const PORT = process.env.PORT || 5000; // Use PORT from .env or default to 5000

// Middleware
app.use(express.json());

// Routes
app.get('/api/auth/signup', (req, res) => {
    res.send('Signup route');
});

app.get('/api/auth/login', (req, res) => {
    res.send('Login route');
});


app.get('/api/auth/logout', (req, res) => {
    res.send('logout route');
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});