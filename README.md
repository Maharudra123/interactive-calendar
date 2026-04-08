# 🗺️ Expedition Booking: Interactive Calendar

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

**Live Demo:** [Insert your Vercel Link Here]  
**Video Walkthrough:** [Insert your Loom/YouTube Link Here]

## 🎯 Overview

This project is a highly interactive, responsive calendar component built as part of a Frontend Engineering Challenge. Instead of presenting a generic UI, it has been themed as a premium **Travel & Expedition Booking Dashboard**.

It emulates the aesthetic of a physical wall calendar while offering robust digital features like dynamic range selection, fluid page transitions, and persistent state management.

## ✨ Core Features & UX Decisions

- **Advanced Range Selection:** Built a robust custom state machine to handle start dates, dynamic hover-state connections, and end dates, allowing for intuitive multi-day selections without layout thrashing.
- **Persistent "Month Memo" (Local Storage):** Notes are bound to the specific month (`yyyy-MM`) being viewed and seamlessly synced to `localStorage`. Flipping between months dynamically swaps and restores the correct text state.
- **Fluid Page Flips:** Integrated `framer-motion` to create buttery-smooth slide animations when paginating through months, mimicking the tactile feel of turning a physical calendar page.
- **Dynamic Theming:** Includes a fully integrated Light/Dark mode toggle that smoothly transitions the entire application UI and updates contextual text colors.
- **Holiday Tracking:** Built-in dictionary mapping to highlight specific global/national holidays on the grid.

## 🏗️ Architecture & Tech Stack

This project was built with strict adherence to the **Single Responsibility Principle**. Massive components were broken down to separate UI, mathematical logic, and static configuration.

- **`/src/constants/calendarData.js`:** Houses static themes, holiday dictionaries, and month-specific hero images.
- **`/src/utils/calendarUtils.js`:** Isolates complex `date-fns` mathematical logic away from React rendering cycles.
- **`/src/components/DayCell.jsx`:** An atomic, highly optimized component responsible purely for rendering the state of an individual day on the grid.

**Dependencies:**

- `date-fns`: Chosen over Moment.js for immutable, functional, and tree-shakeable date mathematics.
- `tailwindcss`: For rapid, utility-first styling and fluid responsiveness.
- `framer-motion`: For declarative, layout-aware animations.
- `lucide-react`: For crisp, modern SVG icons.

## 🚀 Getting Started (Local Development)

To run this project locally, ensure you have Node.js installed on your machine.

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YourUsername/interactive-calendar.git](https://github.com/YourUsername/interactive-calendar.git)
   cd interactive-calendar
   ```

Install dependencies:

Bash
npm install
Start the development server:

Bash
npm run dev
View in browser:
Open http://localhost:5173 in your preferred browser.
