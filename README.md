# Code Quest 🧠💻

*Build your programming knowledge one question at a time.*

Code Quest is a daily programming challenge platform designed to make learning programming a consistent habit.

Every day, users receive a new AI-generated multiple-choice programming question covering topics such as JavaScript, TypeScript, Python, C#, SQL, algorithms, and more. Users can answer the daily question, earn XP, build streaks, level up, and track their performance over time.

The platform is designed around short, daily learning sessions rather than long study sessions, making it easier to consistently improve programming knowledge.

## ✨ Features

### 🧠 Daily Programming Questions
- New programming question every day
- AI-generated questions
- Four-answer multiple-choice format
- Questions cover a variety of programming languages, concepts, and topics
- Questions have different difficulty levels:
  - 🟢 Beginner
  - 🟡 Intermediate
  - 🔴 Advanced
- Detailed explanations are provided after answering

### 🔥 Streak System
- Daily answering streaks
- Current streak tracking
- Highest streak tracking
- Streaks are based on consecutive days of answered questions

### ⭐ XP & Leveling
- Earn XP by correctly answering questions
- Different difficulty levels award different amounts of XP
- Progressive leveling system
- Higher levels require increasingly more XP
- Level tiers provide different titles and colors as users progress

Current level tiers include:
- **Coder**
- **Developer**
- **Engineer**
- **Architect**
- **Master**
- **Legend**

### 📊 Statistics
Users can track their overall performance through statistics including:
- Current streak
- Highest streak
- Accuracy
- Total questions answered
- Total XP
- Current level

Performance can also be broken down by question difficulty to show:
- Questions answered
- Correct answers
- Accuracy

### 🏆 Leaderboard
- Competitive leaderboard system
- Top players can be showcased by XP
- Top three players receive special podium-style treatment
- Designed to encourage consistent learning and progression

### 👤 User Accounts
- User registration
- User login
- User profiles
- Persistent answer history
- Persistent XP and progression

### 📅 Question History
Users can navigate between available daily questions and review previous challenges.

Previously answered questions retain the user's selected answer and the correct answer, allowing them to review their performance.

### 🤖 Automatic Question Generation
The backend automatically generates new questions using AI.

A scheduled backend job runs daily to ensure the next question is available. The application also contains a fallback mechanism that can generate the question on demand if the scheduled generation fails.

### 🎨 Responsive UI
- Modern responsive interface
- Designed for desktop and mobile
- Warm orange/gold visual identity
- Rounded cards and components
- Progress indicators and visual statistics
- Programming-themed visual elements

## 🛠️ Tech Stack

### Frontend

- **React**
- **TypeScript**
- **React Router**
- **Vite**
- **CSS**
- **Deployed on Vercel**

### Backend

- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **dotenv**
- **AI API for question generation**
- **Cron-based question generation**
- **Cron is ran on cron-job.org**
- **Deployed on Render**

## 🏗️ Architecture

Code Quest is split into a frontend and backend application.

The frontend is responsible for:
- User interface
- Routing
- Authentication state
- Question interaction
- Statistics and progression displays
- User profile
- Leaderboard

The backend is responsible for:
- Authentication
- User accounts
- Answer persistence
- Question retrieval
- Answer validation
- XP progression
- AI question generation
- Scheduled daily question generation
- Database operations

## 📈 Progression System

Users progress through the application by earning XP from correctly answered questions.

XP requirements increase as users progress through the level system. Level ranges are grouped into tiers, with each tier providing a different title and visual identity.

| Level | Title |
| --- | --- |
| 1+ | Coder |
| 10+ | Developer |
| 20+ | Engineer |
| 30+ | Architect |
| 40+ | Master |
| 50+ | Legend |

Each tier has its own primary color, allowing a user's progression to become increasingly visible throughout the application.

## 🚀 Deployment

The frontend is deployed using **Vercel**.

The backend is deployed separately and communicates with the frontend through the application's API.

Live website:

**https://code-quest-daily.vercel.app/**

## 🎯 Goal

The goal of Code Quest is simple:

**Make learning programming something you do every day.**

Instead of relying on occasional long study sessions, Code Quest encourages users to spend a small amount of time answering programming questions every day, gradually building knowledge, consistency, and confidence.