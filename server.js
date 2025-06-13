const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const session = require('express-session');

const app = express();
const client = new OAuth2Client('67480779251-g65fvsk55f7p630vg1qse1j1dtku6av2.apps.googleusercontent.com client.id');

// Middleware
app.use(express.json());
app.use(session({
    secret: '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 secret id',
    resave: false,
    saveUninitialized: true
}));

// Google Auth Callback
app.post('/auth/google/callback', async (req, res) => {
    try {
        const { token } = req.body;
        
        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '67480779251-g65fvsk55f7p630vg1qse1j1dtku6av2.apps.googleusercontent.com client.id'
        });
        
        const payload = ticket.getPayload();
        const user = {
            id: payload.sub,
            name: payload.name,
            email: payload.email,
            avatar: payload.picture
        };
        
        // Store user in session
        req.session.user = user;
        
        // Return user data to frontend
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