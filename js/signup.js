document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    if (!form || !errorMessage || !successMessage) {
        console.error('Critical signup form elements not found!');
        return;
    }

    // Enhanced logging function
    function logSignupAttempt(status, details) {
        console.log(JSON.stringify({
            timestamp: new Date().toISOString(),
            status: status,
            details: details
        }));
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset messages
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
        successMessage.textContent = '';
        successMessage.style.display = 'none';

        try {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Comprehensive validation
            const validationErrors = [];

            if (!name) validationErrors.push('Name is required');
            if (!email) validationErrors.push('Email is required');
            
            // Enhanced email validation
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (email && !emailRegex.test(email)) {
                validationErrors.push('Invalid email format');
            }

            if (!password) validationErrors.push('Password is required');
            if (!confirmPassword) validationErrors.push('Confirm Password is required');
            
            if (password !== confirmPassword) {
                validationErrors.push('Passwords do not match');
            }

            // Check for validation errors
            if (validationErrors.length > 0) {
                throw new Error(validationErrors.join('. '));
            }

            // Initialize users array
            let users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Check if email already exists
            const emailExists = users.some(user => user && user.email === email);
            if (emailExists) {
                logSignupAttempt('failed', { reason: 'Email already registered', email });
                throw new Error('Email already registered');
            }

            // Create secure user object 
            const newUser = {
                id: crypto.randomUUID(), 
                name: name,
                email: email,
                passwordHash: btoa(password), // Basic encoding (not secure encryption)
                createdAt: new Date().toISOString()
            };

            // Add user to storage
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            // Log successful signup
            logSignupAttempt('success', { email });

            // Show success message
            successMessage.textContent = 'Account created successfully! Redirecting to login...';
            successMessage.style.display = 'block';

            // Clear the form
            form.reset();

            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);

        } catch (error) {
            console.error('Signup error:', error);
            errorMessage.textContent = error.message || 'An error occurred. Please try again.';
            errorMessage.style.display = 'block';
            
            // Log error details
            logSignupAttempt('failed', { 
                message: error.message,
                stack: error.stack 
            });
        }
    });
});
