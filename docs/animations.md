# Animations

## Philosophy

Animations should feel premium, smooth and purposeful.

Every animation should guide attention or improve interaction.

Avoid animations that exist only for decoration.

Target 60 FPS.

---

# Global

Use Lenis for smooth scrolling.

Use Framer Motion for UI animations.

Use CSS transitions wherever JavaScript is unnecessary.

---

# Navbar

Initial State

Transparent.

While Scrolling

Background becomes blurred.

Adds slight transparency.

Appears elevated from the page.

---

# Hero

Hero fades into view on page load.

Elements appear one after another.

Profile image enters slightly after the text.

Buttons animate last.

No excessive motion.

---

# About Section

This is one of the signature interactions.

When scrolling down from the Hero,

the About section should slide upward and partially overlap the Hero section.

It should feel like the About card is emerging from below.

Inside the card:

Left:
Profile image.

Right:
Introduction.

Animation should be smooth and natural.

Reference:
See inspiration screenshot inside inspirations/about/.

---

# Skills

Skills section uses a vertical timeline.

As the user scrolls,

the active timeline indicator moves downward.

Skill icons should animate gently as they become active.

Avoid exaggerated movement.

Reference:
See inspirations/skills/.

---

# Projects

This is the most important interaction.

Desktop

When hovering a project title or card,

display a floating preview image of that project's landing page.

Preview follows the cursor slightly.

Use subtle scaling.

Do NOT autoplay videos.

Mobile

Open project preview normally.

Reference:
See inspirations/projects/.

---

# Contact

Each social link behaves like an interactive card.

Hover

Reveal username.

Slight glow.

Smooth transition.

Click

Open the respective profile.

Reference:
See inspirations/contact/.

---

# Buttons

Hover

Slight scale.

Shadow increases slightly.

Transition duration:
250ms–350ms.

---

# Cards

Hover

Lift slightly.

Increase shadow subtly.

Never bounce.

---

# Images

Fade into view while scrolling.

No spinning.

No rotating.

No unnecessary effects.

---

# Page Transitions

Smooth.

Minimal.

Fast.

---

# Cursor

Optional.

Subtle cursor glow.

No particle explosions.

No heavy cursor trails.

---

# Performance

Animations must not reduce scrolling performance.

Prefer GPU-accelerated transforms.

Respect reduced motion accessibility settings.