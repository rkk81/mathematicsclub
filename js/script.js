// Questions Array with more difficult answers
const questions = [
    {
        question: "What is the solution to the quadratic equation: x² - 5x + 6 = 0?",
        options: ["x = 1, 6", "x = 2, 3", "x = -2, -3", "x = 1, -6"],
        correctAnswer: 1,
        hint: "Use the quadratic formula"
    },
    {
        question: "What is the value of sin(45°) + cos(45°)?",
        options: ["√2", "1", "√2/2", "√3/2"],
        correctAnswer: 0,
        hint: "Use trigonometric identities"
    },
    {
        question: "If the sum of the first n terms of an arithmetic progression is given by S_n = 2n² - 3n, find the 10th term.",
        options: ["15", "18", "25", "20"],
        correctAnswer: 2,
        hint: "Use the formula for the nth term of an arithmetic progression"
    },
    {
        question: "Find the area of a triangle with vertices at (0,0), (3,0), and (0,4).",
        options: ["6", "12", "8", "4"],
        correctAnswer: 0,
        hint: "Use the formula for the area of a triangle"
    },
    {
        question: "What is the value of the integral ∫(3x² + 2x - 1) dx?",
        options: ["x³ + x² - x + C", "x³ + x² + x + C", "x³ + x² - x + 1", "x³ + 2x² - x + C"],
        correctAnswer: 0,
        hint: "Use integration by parts"
    },
    {
        question: "If the equation of a circle is x² + y² - 4x - 6y + 9 = 0, what is the radius?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 1,
        hint: "Complete the square"
    },
    {
        question: "What is the value of tan(60°)?",
        options: ["√3", "1", "√2", "2"],
        correctAnswer: 0,
        hint: "Use trigonometric identities"
    },
    {
        question: "Find the derivative of the function f(x) = 3x³ - 5x² + 4x - 2.",
        options: ["9x² - 10x + 4", "9x² - 10x - 4", "6x² - 10x + 4", "6x² - 10x - 4"],
        correctAnswer: 0,
        hint: "Use the power rule"
    },
    {
        question: "Solve for x in the equation: log(x) + log(2x) = 3",
        options: ["100", "50", "10", "20"],
        correctAnswer: 0,
        hint: "Use logarithmic properties"
    },
    {
        question: "The sum of the first 20 terms of an arithmetic series is 140. Find the common difference if the first term is 2.",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1,
        hint: "Use the formula for the sum of an arithmetic series"
    },
    {
        question: "If the complex number z = 3 + 4i, what is the modulus of z?",
        options: ["5", "7", "3", "4"],
        correctAnswer: 0,
        hint: "Use the formula for the modulus of a complex number"
    },
    {
        question: "Find the limit of the function lim x→0 (sin(x) / x)",
        options: ["1", "∞", "0", "undefined"],
        correctAnswer: 0,
        hint: "Use L'Hopital's rule"
    },
    {
        question: "What is the distance between the points (1, 2) and (4, 6)?",
        options: ["5", "6", "7", "4"],
        correctAnswer: 0,
        hint: "Use the distance formula"
    },
    {
        question: "Find the value of the derivative of f(x) = ln(x) at x = 1.",
        options: ["1", "0", "e", "ln(1)"],
        correctAnswer: 0,
        hint: "Use the chain rule"
    },
    {
        question: "What is the value of cos(30°) + sin(30°)?",
        options: ["√3/2", "1", "√2", "1/2"],
        correctAnswer: 0,
        hint: "Use trigonometric identities"
    },
    {
        question: "What is the general solution to the equation tan(x) = 1?",
        options: ["x = π/4 + nπ", "x = π/2 + nπ", "x = π/4 + 2nπ", "x = π/2 + 2nπ"],
        correctAnswer: 0,
        hint: "Use the inverse tangent function"
    }
];

// Timer and Score Variables
let score = 0;
let timeRemaining = 300; // 5 minutes

// Shuffle questions
function shuffleQuestions() {
    return questions.sort(() => Math.random() - 0.5).slice(0, 5);
}

// Display the quiz questions dynamically
function displayQuestions() {
    const questionContainer = document.getElementById('questions-container');
    const selectedQuestions = shuffleQuestions();

    questionContainer.innerHTML = ''; // Clear existing questions

    selectedQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('mcq-question');
        questionDiv.innerHTML = `
            <p>${question.question}</p>
            <ul>
                ${question.options.map((option, i) => `
                    <li>
                        <button class="mcq-answer" data-index="${index}" data-option="${i}" data-correct="${i === question.correctAnswer}">${option}</button>
                    </li>
                `).join('')}
            </ul>
            <button class="hint-btn" data-index="${index}">Show Hint</button>
            <p class="hint-text" id="hint-${index}" style="display: none;">${question.hint}</p>
        `;
        questionContainer.appendChild(questionDiv);
    });
}

// Timer Function
function startTimer() {
    const timerDisplay = document.getElementById('timer');

    const interval = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(interval);
            endQuiz();
        } else {
            timeRemaining--;
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            timerDisplay.textContent = `Time Left: ${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

// End Quiz
function endQuiz() {
    showModal(`Quiz Over! Your Score: ${score}`);
}

// Handle Answer Click
function handleAnswerClick(event) {
    if (!event.target.classList.contains('mcq-answer')) return;

    const button = event.target;
    const isCorrect = button.getAttribute('data-correct') === 'true';

    // Update Score
    if (isCorrect) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('incorrect');
    }

    // Disable all options for the question
    const buttons = button.closest('ul').querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true);
}

// Show Hint
function handleHintClick(event) {
    if (!event.target.classList.contains('hint-btn')) return;

    const index = event.target.getAttribute('data-index');
    const hint = document.getElementById(`hint-${index}`);
    hint.style.display = 'block';
}

// Modal Management
function showModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.innerHTML = message;
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = "none";
}

// Initialize Quiz
document.addEventListener('DOMContentLoaded', function () {
    displayQuestions();
    startTimer();
    
    document.getElementById('questions-container').addEventListener('click', handleAnswerClick);
    document.getElementById('questions-container').addEventListener('click', handleHintClick);

    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', closeModal);

    window.onclick = function (event) {
        if (event.target === document.getElementById('modal')) {
            closeModal();
        }
    };
});

document.addEventListener('DOMContentLoaded', function () {
    const olympiadLink = document.getElementById('olympiad-link');
    const loggedInUser   = localStorage.getItem('loggedIn'); // Check if user is logged in

    olympiadLink.addEventListener('click', function (e) {
        if (!loggedInUser ) {
            e.preventDefault(); // Prevent default action
            alert('You must be logged in to access Olympiad questions.'); // Alert user
            window.location.href = 'login.html'; // Redirect to login page
        }
    });
});