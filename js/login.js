document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    // Reset messages
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';

    // Enhanced validation
    if (!email || !password) {
        errorMessage.textContent = 'Please fill in all fields';
        errorMessage.style.display = 'block';
        return;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        errorMessage.textContent = 'Invalid email format';
        errorMessage.style.display = 'block';
        return;
    }

    try {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Find user with matching email and decoded password
        const user = users.find(u => 
            u.email === email && 
            (u.passwordHash === btoa(password) || u.password === password)
        );

        if (!user) {
            errorMessage.textContent = 'Invalid email or password';
            errorMessage.style.display = 'block';
            return;
        }

        // Store current user info securely
        const currentUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            isLoggedIn: true,
            lastLogin: new Date().toISOString()
        };
        
        // Use sessionStorage for more secure temporary storage
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

        // Show success message
        successMessage.textContent = 'Login successful! Redirecting...';
        successMessage.style.display = 'block';

        // Redirect to home page after 1.5 seconds
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1500);
    } catch (error) {
        console.error('Login error:', error);
        errorMessage.textContent = 'An error occurred. Please try again.';
        errorMessage.style.display = 'block';
    }
});
