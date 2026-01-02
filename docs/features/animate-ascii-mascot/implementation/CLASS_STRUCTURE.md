# Class Structure: Animate ASCII Bat Mascot (Revised)

## Components

### `client/mascot.js`
A standalone script file.

#### Data Structures
- `frames: String[]`: Array of loaded ASCII strings.
- `SEQUENCE: Int[]`: Order of frame indices for the animation (e.g., `[0, 1, 0, 2]`).
- `CONFIG`: Object containing settings like `INTERVAL_MS = 100`.

#### Functions
- `async loadFrames()`: Fetches text files from `mascot/frames/`.
- `startAnimation()`: Initializes the loop.
- `updateMascot()`: Swaps the `textContent` of `#mascot`.

## File Organization
- `client/index.html`: Main page.
- `client/mascot.js`: Animation logic.
- `client/mascot/frames/*.txt`: Individual ASCII art files.