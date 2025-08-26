// Music data for random selection
const musicData = {
    chordProgressions: [
        'C - Am - F - G',
        'Am - F - C - G',
        'C - F - Am - G',
        'G - Am - F - C',
        'F - C - G - Am',
        'Em - Am - D - G',
        'C - G - Am - F',
        'Am - Dm - G - C',
        'F - G - Em - Am',
        'C - Am - Dm - G',
        'Dm - G - C - Am',
        'G - Em - C - D',
        'Am - F - G - Em',
        'C - Em - F - G',
        'F - Am - G - C',
        'Dm - Am - G - F',
        'C - F - G - C',
        'Am - Dm - F - G',
        'G - C - Em - Am',
        'F - G - C - F',
        'Em - C - G - D',
        'Am - G - F - E',
        'C - Dm - Em - F',
        'G - F - Em - Dm',
        'Am - C - F - Dm'
    ],
    
    instruments: [
        'ピアノ + ギター',
        'アコースティックギター + ヴォーカル',
        'エレキギター + ベース + ドラム',
        'シンセサイザー + パッド',
        'バイオリン + ピアノ',
        'ウクレレ + カホン',
        'フルート + ハープ',
        'サックス + ピアノ',
        'チェロ + ギター',
        'ドラム + ベース + シンセ',
        'オルガン + ヴォーカル',
        'アコーディオン + バンジョー',
        'トランペット + ピアノ',
        'ギター + ストリングス',
        'エレピ + ベース',
        'マリンバ + フルート',
        'ハーモニカ + ギター',
        'オーボエ + ピアノ',
        'バンジョー + フィドル',
        'シンセベース + パッド',
        'クラリネット + ストリングス',
        'ジャズギター + ブラシドラム',
        'ティンパニ + オーケストラ',
        'エレキバイオリン + シンセ',
        'カリンバ + アンビエント'
    ]
};

// DOM elements
const generateBtn = document.getElementById('generateBtn');
const resultArea = document.getElementById('resultArea');
const chordValue = document.getElementById('chordValue');
const instrumentValue = document.getElementById('instrumentValue');

// Utility function to get random item from array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Animation helper functions
function animateValueChange(element, newValue, delay = 0) {
    setTimeout(() => {
        element.style.transform = 'translateX(-10px)';
        element.style.opacity = '0.7';
        
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        }, 150);
    }, delay);
}

// Generate random challenge
function generateChallenge() {
    // Add loading state to button
    generateBtn.classList.add('loading');
    generateBtn.disabled = true;
    
    // Hide result area temporarily
    resultArea.style.transform = 'translateY(10px)';
    resultArea.style.opacity = '0.8';
    
    // Generate random selections
    const randomChord = getRandomItem(musicData.chordProgressions);
    const randomInstrument = getRandomItem(musicData.instruments);
    
    // Simulate loading time for better UX
    setTimeout(() => {
        // Update values with staggered animation
        animateValueChange(chordValue, randomChord, 0);
        animateValueChange(instrumentValue, randomInstrument, 200);
        
        // Show result area
        setTimeout(() => {
            resultArea.classList.add('show');
            resultArea.style.transform = 'translateY(0)';
            resultArea.style.opacity = '1';
        }, 400);
        
        // Remove loading state
        setTimeout(() => {
            generateBtn.classList.remove('loading');
            generateBtn.disabled = false;
        }, 600);
        
    }, 800);
}

// Event listeners
generateBtn.addEventListener('click', generateChallenge);

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !generateBtn.disabled) {
        event.preventDefault();
        generateChallenge();
    }
});

// Add some interactive hover effects
document.querySelectorAll('.result-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effect to button
generateBtn.addEventListener('mousedown', function() {
    this.style.transform = 'translateY(2px) scale(0.98)';
});

generateBtn.addEventListener('mouseup', function() {
    this.style.transform = 'translateY(-2px) scale(1)';
});

generateBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
});

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Add entrance animation to elements
    const elements = document.querySelectorAll('.challenge-card, .header, .footer');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    console.log('🎵 1Week Music Challenge - Ready to generate topics!');
});