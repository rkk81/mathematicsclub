// Subject cards interaction
document.addEventListener('DOMContentLoaded', () => {
    initializeSubjects();
    loadProgress();
});

function initializeSubjects() {
    const subjectCards = document.querySelectorAll('.subject-card');
    
    subjectCards.forEach(card => {
        // Add subject icons
        const subject = card.querySelector('h3').textContent.toLowerCase();
        const icon = document.createElement('div');
        icon.className = 'icon';
        icon.innerHTML = getSubjectIcon(subject);
        card.appendChild(icon);
        
        // Add progress bar
        const progress = document.createElement('div');
        progress.className = 'progress';
        progress.innerHTML = '<div class="progress-bar"></div>';
        card.appendChild(progress);
        
        // Add topics list
        const topics = document.createElement('div');
        topics.className = 'topics';
        topics.innerHTML = getTopicsList(subject);
        card.appendChild(topics);
        
        // Add click event
        card.addEventListener('click', (e) => {
            if (!e.target.closest('a')) {
                toggleTopics(card);
            }
        });
        
        // Add hover effect
        card.addEventListener('mousemove', handleHover);
        card.addEventListener('mouseleave', resetCard);
    });
}

function getSubjectIcon(subject) {
    const icons = {
        'algebra': '∑',
        'geometry': '△',
        'calculus': '∫',
        'statistics': '📊'
    };
    return icons[subject] || '📚';
}

function getTopicsList(subject) {
    const topics = {
        'algebra': [
            'Linear Equations',
            'Polynomials',
            'Quadratic Equations',
            'Functions'
        ],
        'geometry': [
            'Triangles',
            'Circles',
            'Coordinate Geometry',
            'Trigonometry'
        ],
        'calculus': [
            'Limits',
            'Derivatives',
            'Integration',
            'Applications'
        ],
        'statistics': [
            'Probability',
            'Data Analysis',
            'Distributions',
            'Regression'
        ]
    };
    
    const subjectTopics = topics[subject] || [];
    return `
        <ul>
            ${subjectTopics.map(topic => `<li>${topic}</li>`).join('')}
        </ul>
    `;
}

function toggleTopics(card) {
    card.classList.toggle('expanded');
    
    // Animate progress bar
    const progressBar = card.querySelector('.progress-bar');
    if (card.classList.contains('expanded')) {
        const progress = getProgress(card.querySelector('h3').textContent.toLowerCase());
        progressBar.style.width = `${progress}%`;
    } else {
        progressBar.style.width = '0';
    }
}

function getProgress(subject) {
    // Get progress from localStorage or set default
    const progress = localStorage.getItem(`${subject}_progress`) || Math.floor(Math.random() * 100);
    return progress;
}

function handleHover(e) {
    const { left, top, width, height } = this.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    this.style.transform = `
        perspective(1000px)
        rotateX(${(y - 0.5) * 10}deg)
        rotateY(${(x - 0.5) * 10}deg)
        translateZ(20px)
    `;
}

function resetCard() {
    this.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        translateZ(0)
    `;
}

function loadProgress() {
    // Simulate loading progress data
    const subjects = ['algebra', 'geometry', 'calculus', 'statistics'];
    subjects.forEach(subject => {
        if (!localStorage.getItem(`${subject}_progress`)) {
            localStorage.setItem(`${subject}_progress`, Math.floor(Math.random() * 100));
        }
    });
}

// Export functions for potential use in other modules
export {
    initializeSubjects,
    loadProgress
};
