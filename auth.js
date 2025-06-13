// Handle Google Auth Response
function handleGoogleAuth(response) {
    if (response.credential) {
        // Send token to your backend
        fetch('/auth/google/callback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: response.credential })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // Store user data
                localStorage.setItem('designersio_user', JSON.stringify(data.user));
                
                // Redirect to profile or home page
                window.location.href = data.user ? 'profile.html' : 'index.html';
            } else {
                alert('Google authentication failed: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Authentication error occurred');
        });
    }
}

// Check login status on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const userData = localStorage.getItem('designersio_user');
    if (userData) {
        const user = JSON.parse(userData);
        updateAuthUI(user);
    }

    // Initialize Google Auth
    window.onGoogleAuthLoad = function() {
        google.accounts.id.initialize({
            client_id: '67480779251-g65fvsk55f7p630vg1qse1j1dtku6av2.apps.googleusercontent',
            callback: handleGoogleAuth
        });
    };
});

// Update UI based on auth state
function updateAuthUI(user) {
    const userIcon = document.querySelector('.user-icon');
    if (userIcon && user) {
        userIcon.innerHTML = `
            <img src="${user.avatar}" alt="${user.name}" class="user-avatar">
        `;
        userIcon.href = "profile.html";
    }
}

// Logout function
function logout() {
    localStorage.removeItem('designersio_user');
    window.location.href = 'index.html';
}