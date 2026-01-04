# Design: Character Page

## Aesthetic: Cryptid Console (8-bit Vampiric Retro-Tech)
The character page will implement the design tokens defined in the system styleguide.

## Layout
- **Mobile-First:** Single column stack.
- **Container:** `max-w-6xl` with `px-6` padding.
- **Header:** Title "CHARACTER" in `VT323` font, uppercase.
- **Mascot Section:** Pip the Bat ASCII art, colored `#58a6ff`.
- **Stats Card:** A central card (`bg-crypt`) containing:
    - Name (Placeholder)
    - Level (Progress bar styled)
    - Health/Energy
    - Habits Completed
- **Navigation:** A footer button "BACK TO VOID" (Home).

## Visual Elements
- **Borders:** 2px solid `#4b0082` (Gloom).
- **Shadows:** Hard 4px shadows with no blur.
- **Buttons:** Radical (`#ff0055`) background with Void (`#0d0208`) text.

## Technical Implementation
- **HTML:** Semantic tags (`header`, `main`, `footer`).
- **CSS:** Embedded `<style>` block for rapid prototyping and styleguide adherence.
- **JS:** Minimal script to handle any dynamic placeholder data if needed.
