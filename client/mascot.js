(function() {
    // Configuration
    const CONFIG = {
        FRAMES_DIR: 'mascot/frames/',
        FRAME_FILES: ['neutral.txt', 'up.txt', 'down.txt'],
        // 0: Neutral, 1: Up, 2: Down
        FLAP_SEQUENCE: [1, 0, 2, 0], 
        INTERVAL_MS: 100,
        DELAY_MIN: 1000,
        DELAY_MAX: 5000,
        CYCLES_MIN: 1,
        CYCLES_MAX: 3
    };

    // State
    let frames = [];
    let mascotElement = null;

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
            mascotElement = document.getElementById('mascot');
            if (!mascotElement) {
                console.error('Mascot element not found');
                return;
            }

            const promises = CONFIG.FRAME_FILES.map(file => fetchFrame(file));
            frames = await Promise.all(promises);
            console.log('Mascot frames loaded successfully.');
            setFrame(0);
            runBehaviorLoop();
        } catch (error) {
            console.error('Error loading mascot frames:', error);
        }
    }

    /**
     * Sets the mascot content to a specific frame index.
     * @param {number} index 
     */
    function setFrame(index) {
        if (mascotElement && frames[index]) {
            mascotElement.textContent = frames[index];
        }
    }

    /**
     * Returns a random integer between min and max (inclusive).
     */
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Sleep for a given number of milliseconds.
     */
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Performs a single flap cycle (Up -> Neutral -> Down -> Neutral).
     */
    async function flapOnce() {
        for (const frameIndex of CONFIG.FLAP_SEQUENCE) {
            await sleep(CONFIG.INTERVAL_MS);
            setFrame(frameIndex);
        }
    }

    /**
     * Main behavior loop: Wait -> Flap -> Repeat.
     */
    async function runBehaviorLoop() {
        while (true) {
            // 1. Wait for a random duration
            const delay = getRandomInt(CONFIG.DELAY_MIN, CONFIG.DELAY_MAX);
            await sleep(delay);

            // 2. Determine number of flaps
            const cycles = getRandomInt(CONFIG.CYCLES_MIN, CONFIG.CYCLES_MAX);

            // 3. Perform flaps
            for (let i = 0; i < cycles; i++) {
                await flapOnce();
            }
            
            // Ensure we end on Neutral (redundant if sequence ends on 0, but good for safety)
            setFrame(0);
        }
    }

    // Initialize on load
    document.addEventListener('DOMContentLoaded', loadFrames);
})();