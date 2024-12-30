// Check if user is logged in
function isLoggedIn() {
    const currentUser = JSON.parse(
        sessionStorage.getItem('currentUser') || 
        localStorage.getItem('currentUser') || 
        'null'
    );
    return currentUser && currentUser.isLoggedIn;
}

// Get current user info
function getCurrentUser() {
    const currentUser = JSON.parse(
        sessionStorage.getItem('currentUser') || 
        localStorage.getItem('currentUser') || 
        'null'
    );
    return currentUser;
}

// Logout function
function logout() {
    // Clear user session from both storage mechanisms
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('currentUser');
    
    // Reload the current page to reset UI
    window.location.reload();
}

// Update UI based on auth state
function updateAuthUI() {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const logoutButton = document.getElementById('logoutButton');
    const userInfo = document.getElementById('userInfo');

    if (isLoggedIn()) {
        const user = getCurrentUser();
        if (loginButton) loginButton.style.display = 'none';
        if (signupButton) signupButton.style.display = 'none';
        if (logoutButton) {
            logoutButton.style.display = 'block';
            logoutButton.onclick = logout;
        }
        if (userInfo) {
            userInfo.style.display = 'block';
            userInfo.textContent = `Welcome, ${user.name || 'User'}`;
        }
    } else {
        if (loginButton) loginButton.style.display = 'block';
        if (signupButton) signupButton.style.display = 'block';
        if (logoutButton) logoutButton.style.display = 'none';
        if (userInfo) userInfo.style.display = 'none';
    }
}

// Call updateAuthUI when page loads
document.addEventListener('DOMContentLoaded', updateAuthUI);
