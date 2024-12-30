document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    if (!form) {
        console.error('Signup form not found!');
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const errorMessage = document.getElementById('errorMessage');
        const successMessage = document.getElementById('successMessage');

        console.log('Form submitted with:', { name, email });

        // Reset messages
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';

        try {
            // Enhanced validation
            if (!name || !email || !password || !confirmPassword) {
                throw new Error('Please fill in all fields');
            }

            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }

            // Enhanced email validation
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                throw new Error('Please enter a valid email address');
            }

            // Enhanced password strength validation
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(password)) {
                throw new Error('Password must be at least 8 characters long, contain uppercase, lowercase, number, and special character');
            }

            // Initialize users array
            let users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Check if email already exists
            const emailExists = users.some(user => user && user.email === email);
            if (emailExists) {
                throw new Error('Email already registered');
            }

            // Create secure user object (avoid storing plain text password)
            const newUser = {
                id: crypto.randomUUID(), // More secure unique ID
                name: name,
                email: email,
                passwordHash: btoa(password), // Basic encoding (not secure encryption)
                createdAt: new Date().toISOString()
            };

            // Add user to storage
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

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
        }
    });
});
