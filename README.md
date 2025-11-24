# MLB Pitch Analysis Dashboard

A modern web application for analyzing baseball pitch data from the 2025 MLB season.

## Features

- **Pitcher Selection**: Choose from 10 specific pitchers to analyze
- **Comprehensive Statistics**: View detailed pitch metrics including:
  - Pitch count and usage percentage
  - Average speed, break, and spin rate
  - Hit exit speed and launch angle
- **Interactive Data Table**: Sort by any column for easy analysis
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **About Page**: Learn about the developer and technical implementation

## Tech Stack

### Frontend

- React 18 with Hooks
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- Vite for fast development and building

### Backend

- Node.js with Express
- SQLite database
- RESTful API design
- CORS enabled

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- SQLite database file with pitch data

### Database Setup

1. Place your SQLite database file in the `backend` directory
2. Update the database path in `backend/server.js` or set the `DB_PATH` environment variable

### Backend Setup

```bash
cd backend
npm install
npm start
```

The server will run on http://localhost:5001

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The application will open at http://localhost:3000

## Project Structure

```
baseball-app/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── [database.db]  # Your SQLite database
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       └── components/
│           ├── Dashboard.jsx
│           ├── About.jsx
│           ├── Navigation.jsx
│           ├── PitcherSelector.jsx
│           ├── PitchSummaryTable.jsx
│           ├── LoadingSpinner.jsx
│           └── ErrorMessage.jsx
└── README.md
```

## API Endpoints

- `GET /api/pitchers` - Get list of available pitchers
- `GET /api/pitcher/:pitcherId` - Get pitcher details
- `GET /api/pitcher/:pitcherId/summary` - Get pitch summary statistics
- `GET /api/health` - Health check endpoint

## Database Schema

Expected tables and columns:

- `pitches` table with columns:
  - `player_id`
  - `pitch_type`
  - `speed`
  - `horizontal_break`
  - `induced_vertical_break`
  - `spin_rate`
  - `exit_speed`
  - `launch_angle`
- `players` table with columns:
  - `player_id`
  - `name`
  - `team` (optional)

## Development Notes

- The application includes demo data fallback for development without a database
- Error handling provides graceful degradation
- The UI is optimized for performance with React hooks and memoization
- Tailwind CSS provides utility-first styling for rapid development

## Future Enhancements

- Data visualization charts (D3.js/Chart.js)
- Advanced filtering and search
- Player comparison features
- Export functionality
- Real-time updates via WebSockets
- Machine learning predictions

## License

This project is confidential and should not be shared publicly.
