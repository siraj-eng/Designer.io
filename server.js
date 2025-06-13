const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const session = require('express-session');
require('dotenv').config(); // <- Use .env file

const app = express();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Middleware
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Google Auth Callback
app.post('/auth/google/callback', async (req, res) => {
    try {
        const { token } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const user = {
            id: payload.sub,
            name: payload.name,
            email: payload.email,
            avatar: payload.picture
        };

        req.session.user = user;

        res.json({ success: true, user });
    } catch (error) {
        console.error('Google auth error:', error);
        res.status(401).json({ success: false, error: 'Authentication failed' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
