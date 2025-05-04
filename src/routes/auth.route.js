import express from 'express';


const router = express.Router();

router.get('/signup', (req, res) => {
    res.send('Signup route');
});

router.get('/login', (req, res) => {
    res.send('Login route');
});


router.get('/logout', (req, res) => {
    res.send('logout route');
});


export default router;
// This code defines a simple Express router for authentication routes. It includes three routes: signup, login, and logout. Each route sends a response indicating which route was accessed. The router is then exported for use in other parts of the application.
