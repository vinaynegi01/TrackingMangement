# Budget Tracking System - Setup Guide

## Prerequisites
Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/)
- [npm (Node Package Manager)](https://www.npmjs.com/)
- [Visual Studio Code (VS Code)](https://code.visualstudio.com/)
- [XAMPP](https://www.apachefriends.org/) (for database connectivity)

## Setup Instructions

### 1. Download and Organize the Project Files
1. Download both the frontend (`BudgetTrackingSystem`) and backend (`TrackingMangeMentBackend`) repositories.
2. Keep both folders inside a single directory.

### 2. Open VS Code and Set Up Terminal Panels
1. Open **VS Code**.
2. Open two terminal panels:
   - One for the **frontend**.
   - One for the **backend**.

### 3. Set Up and Run the Frontend
1. Navigate to the frontend directory:
   ```sh
   cd BudgetTrackingSystem
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

### 4. Set Up and Run the Backend
1. Navigate to the backend directory:
   ```sh
   cd TrackingMangeMentBackend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm run dev
   ```

### 5. Set Up the Database
1. Download and install [XAMPP](https://www.apachefriends.org/).
2. Open **XAMPP Control Panel** and start **MySQL**.
3. Open **phpMyAdmin** in your browser (`http://localhost/phpmyadmin/`).
4. Create a new database with the name:
   ```sh
   BudgetManagement
   ```

### 6. Restart the Backend Server
1. If the backend was already running, stop it and restart:
   ```sh
   npm run dev
   ```

Your Budget Tracking System should now be running successfully! 🎉

