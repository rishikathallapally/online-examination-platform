# EXAMLY – Online Examination & Assessment Platform

EXAMLY is a responsive, frontend-based online examination platform built with React. It allows users to explore exams, attempt timed assessments, track their scores, and review their examination history through a clean and user-friendly interface.

## Live Demo

[View Live Website](YOUR_LIVE_WEBSITE_URL)

## GitHub Repository

[View Source Code](YOUR_GITHUB_REPOSITORY_URL)

## Features

- **Dashboard:** View examination statistics and recent activity.
- **Exam Library:** Browse exams by subject and difficulty.
- **Timed Assessments:** Attempt multiple-choice questions with a countdown timer.
- **Question Navigation:** Move between questions and track answered and unanswered questions.
- **Results & Review:** View scores, percentages, performance status, and answer reviews.
- **Exam History:** Search, filter, and sort previous examination results.
- **Profile Management:** Edit personal profile information.
- **Settings:** Manage preferences and switch between light and dark themes.
- **Responsive Design:** Optimized for mobile, tablet, and desktop screens.
- **Local Storage:** Retains examination results and user preferences in the browser.

## Technologies Used

- React
- JavaScript (ES6+)
- Tailwind CSS
- React Router
- Lucide React
- HTML5
- Vite
- Browser Local Storage

## Project Structure

```text
online-examination-platform/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── StatCard.jsx
│   │   └── ExamCard.jsx
│   │
│   ├── pages/
│   │   ├── MyExams.jsx
│   │   ├── ExamInstructions.jsx
│   │   ├── TakeExam.jsx
│   │   ├── Results.jsx
│   │   ├── History.jsx
│   │   ├── Profile.jsx
│   │   ├── Settings.jsx
│   │   ├── Login.jsx
│   │   └── NotFound.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project folder:

   ```bash
   cd online-examination-platform
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal.

### Production Build

To create an optimized production build:

```bash
npm run build
```

## Demo Login

Use the following credentials to explore the demonstration interface:

- **Email:** demo@examly.com
- **Password:** examly123

## Project Scope

EXAMLY is a frontend-only demonstration project. Exam data is predefined, and user preferences and results are stored in browser Local Storage. It does not include a backend, database, secure authentication, or a real online examination server.

## Author

**Rishika Thallapally**