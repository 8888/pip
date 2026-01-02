# Design: Animate ASCII Bat Mascot (Revised)

## Technical Approach

### 1. ASCII Frames
Frames are stored as individual text files to ensure they are easy to edit and maintain:
- `client/mascot/frames/neutral.txt`
- `client/mascot/frames/up.txt`
- `client/mascot/frames/down.txt`

### 2. Implementation Mechanism
- **`mascot.js`**: A dedicated script responsible for:
    - Fetching all frame files asynchronously on load.
    - Storing frame strings in an array.
    - Running an asynchronous "behavior loop" that simulates lifelike movement.
- **Target**: The `<pre id="mascot">` element in `index.html`.

### 3. Animation Logic ("Lifelike Behavior")
Instead of a constant loop, the mascot will follow this pattern:
1.  **Wait:** Sleep for a random duration between 1 and 5 seconds.
2.  **Action:** Perform a "Flap Sequence".
    - A sequence consists of 1 to 3 "Flaps".
    - One "Flap" cycle: `Up -> Neutral -> Down -> Neutral`.
    - Frame duration: 100ms.
3.  **Repeat:** Go back to step 1.

## Considerations
- **Separation of Concerns:** Mascot logic is entirely isolated from the Tracker API logic.
- **Maintainability:** Adding or modifying frames only requires editing simple text files.
- **Performance:** Frames are fetched once at startup. Animation is handled via standard DOM manipulation.
