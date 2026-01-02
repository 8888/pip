// Configuration
const CONFIG = {
    FRAMES_DIR: 'mascot/frames/',
    FRAME_FILES: ['neutral.txt', 'up.txt', 'down.txt'],
    SEQUENCE: [0, 1, 0, 2], // Neutral -> Up -> Neutral -> Down
    INTERVAL_MS: 100
};

// State
let frames = [];
let currentStep = 0;
let animationInterval = null;

/**
 * Fetches a single text file.
 * @param {string} filename 
 * @returns {Promise<string>}
 */
async function fetchFrame(filename) {
    const response = await fetch(`${CONFIG.FRAMES_DIR}${filename}`);
    if (!response.ok) {
        throw new Error(`Failed to load frame: ${filename}`);
    }
    return response.text();
}

/**
 * Loads all mascot frames from the server.
 */
async function loadFrames() {
    try {
        const promises = CONFIG.FRAME_FILES.map(file => fetchFrame(file));
        frames = await Promise.all(promises);
        console.log('Mascot frames loaded successfully.');
        startAnimation();
    } catch (error) {
        console.error('Error loading mascot frames:', error);
        // Fallback: Do nothing, leave the static ASCII art.
    }
}

/**
 * Updates the mascot DOM element with the current frame.
 */
function updateMascot() {
    const mascotElement = document.getElementById('mascot');
    if (!mascotElement) return;

    const frameIndex = CONFIG.SEQUENCE[currentStep];
    mascotElement.textContent = frames[frameIndex];

    // Advance step, looping back to 0 if at the end
    currentStep = (currentStep + 1) % CONFIG.SEQUENCE.length;
}

/**
 * Starts the animation loop.
 */
function startAnimation() {
    if (animationInterval) clearInterval(animationInterval);
    animationInterval = setInterval(updateMascot, CONFIG.INTERVAL_MS);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', loadFrames);
