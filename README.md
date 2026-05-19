# 🚗 DriveFleet - Premium Car Rental Platform

**DriveFleet** is a modern, high-end, full-stack single-page application (SPA) designed to make peer-to-peer car renting simple, fast, and secure. Built using the premium MERN stack with Next.js 15 App Router, Tailwind CSS, Mongoose, and JWT HTTPOnly cookies, DriveFleet offers renters and hosts an exceptional interface for listing, exploring, and booking vehicles.

---

## 🔗 Live Application URL
- **Live Deployment:** [https://drivefleet-client.vercel.app](https://drivefleet-client.vercel.app)
- **Local API Base:** `http://localhost:5000/api`

---

## ✨ Outstanding Website Features

DriveFleet is designed with top-tier premium heuristics, smooth micro-animations, and robust backend integrations. Key features include:

*   **🌓 Sleek Dark/Light Theme Switcher:** Fully customizable manual dark and light modes with custom CSS variables, glassmorphic layout cards, and persistent memory across browser page refreshes.
*   **🛡️ Secure Session Cookies & JWT Protection:** State-of-the-art authentication utilizing HTTPOnly cookies. Logged-in users remain securely authenticated upon reloading private routes without unexpected redirects.
*   **🔍 Advanced Live Regex Search & Type Filters:** Fluid explore grid allowing instant name queries powered by MongoDB `$regex` along with easy-click car type buttons (SUV, Sedan, Hatchback, Luxury).
*   **🔑 Strict Interactive Password Validation:** Form validations during registration requiring at least 6 characters, one uppercase letter, and one lowercase letter, featuring dynamic success indicators.
*   **📋 Unified CRUD & Listing Ownership Dashboard:** Interactive dashboard for hosts to add listings, update fields via animated modal forms, and securely delete listings with double-confirmation overlays.
*   **📬 Seamless Booking & Host Count Increments:** Interactive booking preference modal (Professional Driver choice, Special Notes) that auto-updates total book counts using `$inc` operators.

---

## 🛠️ Technology Stack Used

### Client-Side (Frontend):
- **Core Framework:** Next.js 15 (App Router, JavaScript)
- **Styling & Theme:** Tailwind CSS v4, Vanilla HSL CSS Variables
- **Animations:** Framer Motion (Transitions & Banner effects)
- **Icons:** Lucide React (Sleek vector icons)
- **Requests & State:** Axios (HTTP client with credentials) & React Context API
- **Notifications:** React Hot Toast (Premium alert replacements)

### Server-Side (Backend):
- **Core Engine:** Node.js, Express.js
- **Database Wrapper:** MongoDB & Mongoose ORM
- **Fallback Engine:** Zero-Config Memory Database (Auto-fallback on local network blocks)
- **Security & Password:** JSON Web Tokens (JWT), BCryptJS
- **Session Transport:** Cookie Parser (Secure HTTPOnly cookies)

---

## 🚀 How to Run the Client Locally

1.  **Clone / Copy the directory:**
    ```bash
    cd drivefleet-client
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Ensure Server is Running:**
    Verify that your `drivefleet-server` is active on port `5000`.
4.  **Run Development Server:**
    ```bash
    npm run dev
    ```
5.  **Access App:**
    Open [http://localhost:3000](http://localhost:3000) in your modern browser!
