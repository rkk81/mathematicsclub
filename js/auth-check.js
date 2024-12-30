document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname.toLowerCase();
    if (!currentPath.endsWith('index.html') && !currentPath.endsWith('login.html')) {
        if (!localStorage.getItem('isLoggedIn')) {
            localStorage.setItem('redirectAfterLogin', window.location.href);
            
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                backdrop-filter: blur(8px);
                background: linear-gradient(135deg, rgba(76, 0, 255, 0.4), rgba(0, 183, 255, 0.4));
                z-index: 9999;
                display: flex;
                justify-content: center;
                align-items: center;
            `;

            const messageBox = document.createElement('div');
            messageBox.style.cssText = `
                background: rgba(255, 255, 255, 0.95);
                padding: 30px 40px;
                border-radius: 15px;
                text-align: center;
                max-width: 90%;
                width: 400px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                border: 1px solid rgba(255,255,255,0.3);
                animation: fadeIn 0.5s ease-out;
            `;

            const lockIcon = document.createElement('div');
            lockIcon.innerHTML = '🔒';
            lockIcon.style.cssText = `
                font-size: 48px;
                margin-bottom: 20px;
                animation: bounce 1s infinite;
            `;

            const title = document.createElement('h3');
            title.textContent = 'Login Required';
            title.style.cssText = `
                margin: 0 0 15px 0;
                color: #2c3e50;
                font-size: 24px;
                font-weight: 600;
            `;

            const message = document.createElement('p');
            message.style.cssText = `
                margin: 0 0 20px 0;
                color: #666;
                font-size: 16px;
                line-height: 1.5;
            `;
            message.textContent = 'Please login to access this page.';

            const timer = document.createElement('div');
            timer.style.cssText = `
                font-size: 18px;
                color: #2c3e50;
                font-weight: 500;
                margin-top: 15px;
                padding: 10px;
                border-radius: 8px;
                background: rgba(236, 240, 241, 0.5);
            `;

            // Add styles for animations
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);

            messageBox.appendChild(lockIcon);
            messageBox.appendChild(title);
            messageBox.appendChild(message);
            messageBox.appendChild(timer);
            overlay.appendChild(messageBox);
            document.body.appendChild(overlay);

            let timeLeft = 5;
            const updateTimer = () => {
                timer.innerHTML = `Redirecting to login page in <span style="color: #e74c3c; font-weight: bold;">${timeLeft}</span> seconds`;
                timer.style.animation = 'pulse 0.5s ease-out';
                setTimeout(() => {
                    timer.style.animation = '';
                }, 500);
                
                if (timeLeft > 0) {
                    timeLeft--;
                    setTimeout(updateTimer, 1000);
                } else {
                    window.location.href = '../pages/login.html';
                }
            };
            
            updateTimer();
        }
    }
});
