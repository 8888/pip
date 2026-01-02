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
    - Running a `setInterval` loop every 100ms to update the `#mascot` element.
- **Target**: The `<pre id="mascot">` element in `index.html`.

### 3. Animation Sequence
The loop will cycle through indices corresponding to: `[Neutral, Up, Neutral, Down]`.

## Considerations
- **Separation of Concerns:** Mascot logic is entirely isolated from the Tracker API logic.
- **Maintainability:** Adding or modifying frames only requires editing simple text files.
- **Performance:** Frames are fetched once at startup. Animation is handled via standard DOM manipulation.