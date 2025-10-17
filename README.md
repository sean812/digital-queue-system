# QueueFlow - Digital Queue Management System

A modern, responsive queue management system built with React that allows customers to get tickets and staff to manage queues efficiently.

## Features

### 👤 Customer Features
- Get digital tickets with unique numbers
- Track real-time queue position
- Clean, intuitive interface

### 👨‍💼 Staff Features  
- View current queue status
- Serve next customer with one click
- Add test customers for demonstration

### 🎨 UI/UX Features
- Dark/Light mode toggle
- Responsive design for all devices
- Professional styling with smooth animations
- Accessible color schemes

## Technology Stack

- **Frontend**: React, JavaScript, CSS3
- **State Management**: React Context API
- **Styling**: Custom CSS with CSS Variables
- **Icons**: Emoji-based for simplicity

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
\\\ash
git clone https://github.com/YOUR_USERNAME/digital-queue-system.git
cd digital-queue-system/frontend
\\\

2. Install dependencies:
\\\ash
npm install
\\\

3. Start the development server:
\\\ash
npm run dev
\\\

4. Open your browser and navigate to \http://localhost:5173\

## Project Structure

\\\
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── RoleSelection.jsx
│   │   ├── CustomerDashboard.jsx
│   │   ├── StaffDashboard.jsx
│   │   └── ...
│   ├── context/            # React context for state management
│   │   └── AppContext.jsx
│   ├── App.jsx             # Main app component
│   ├── App.css             # Global styles
│   └── main.jsx            # Entry point
├── public/                 # Static files
└── package.json           # Dependencies and scripts
\\\

## Usage

1. **Select Role**: Choose between Customer or Staff member
2. **Customer Flow**: 
   - Get a ticket number
   - Track your position in queue
   - Wait for your number to be called
3. **Staff Flow**:
   - View current queue
   - Serve next customer
   - Manage queue efficiently

