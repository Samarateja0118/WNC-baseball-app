// ==========================================
// DEPENDENCIES AND SETUP
// ==========================================
import express, { json } from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// Fix ES modules dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 5001;

// ==========================================
// MIDDLEWARE CONFIGURATION
// ==========================================
// CORS: Allows the React frontend (running on port 3000) to make requests to this backend (port 5000)
app.use(cors());
// JSON parser: Allows the server to parse JSON request bodies
app.use(json());

// ==========================================
// DATABASE CONNECTION
// ==========================================
// Connect to the SQLite database file 'pitches.db'
// This database contains two tables:
// 1. 'players' - lookup table with player_id and player names
// 2. 'pitches' - main data table with all pitch information
const dbPath = path.resolve(__dirname, "mlb_data", "pitches.db");
console.log("Using DB at:", dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("DB error:", err);
  else console.log("Connected to SQLite successfully");
});

// ==========================================
// API ROUTES
// ==========================================

// ------------------------------------------
// ROUTE 1: Get list of available pitchers
// ------------------------------------------
// This endpoint returns the 10 specific pitchers requested
// It joins the pitches and players tables to get the pitcher information
app.get("/api/pitchers", (req, res) => {
  const pitcherNames = [
    "Logan Webb",
    "Carlos Rodón",
    "Garrett Crochet",
    "Zac Gallen",
    "Max Fried",
    "Jake Irvin",
    "MacKenzie Gore",
    "Brad Lord",
    "Jose A. Ferrer",
    "Matt Waldron",
  ];

  const query = `
    SELECT DISTINCT 
      pitches.pitcher_id AS player_id,
      players.name_use || ' ' || players.name_last AS name
    FROM pitches
    INNER JOIN players ON pitches.pitcher_id = players.player_id
    WHERE players.name_use || ' ' || players.name_last IN (${pitcherNames
      .map(() => "?")
      .join(",")})
    ORDER BY name
  `;

  // Execute the query with the pitcher names as parameters (prevents SQL injection)
  db.all(query, pitcherNames, (err, rows) => {
    if (err) {
      console.error("Error fetching pitchers:", err);
      // If database query fails, return a fallback list
      res.json(
        pitcherNames.map((name, index) => ({
          id: `pitcher_${index + 1}`,
          name: name,
        }))
      );
    } else {
      if (rows.length > 0) {
        // Return the actual pitcher data from database
        res.json(
          rows.map((row) => ({
            id: row.player_id,
            name: row.name,
          }))
        );
      } else {
        // If no pitchers found in database, return hardcoded list
        console.log("No pitchers found in database, returning default list");
        res.json(
          pitcherNames.map((name, index) => ({
            id: `pitcher_${index + 1}`,
            name: name,
          }))
        );
      }
    }
  });
});

// ------------------------------------------
// ROUTE 2: Get pitch summary for a specific pitcher
// ------------------------------------------
// This is the main endpoint that calculates all the statistics for each pitch type
app.get("/api/pitcher/:pitcherId/summary", (req, res) => {
  const { pitcherId } = req.params;

  // SQL Query Explanation:
  // This query calculates all required statistics grouped by pitch_type:
  //
  // - pitch_type: The type of pitch (Fastball, Curveball, etc.)
  // - COUNT(*): Total number of pitches of this type
  // - COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(): Percentage of total pitches (window function)
  // - AVG(release_speed): Average pitch speed in MPH
  // - AVG(horizontal_break): Average horizontal movement in inches
  // - AVG(induced_vertical_break): Average vertical movement in inches
  // - AVG(spin_rate): Average spin in RPM
  // - AVG(hit_exit_speed): Average exit velocity when hit (NULL for non-hit pitches)
  // - AVG(hit_launch_angle): Average launch angle when hit
  //
  // Note: We use CASE WHEN for hit statistics to only average non-NULL values
  const query = `
    SELECT 
      pitch_type,
      COUNT(*) as pitch_count,
      ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as usage_percentage,
      ROUND(AVG(release_speed), 2) as avg_speed,
      ROUND(AVG(horizontal_break), 2) as avg_horizontal_break,
      ROUND(AVG(induced_vertical_break), 2) as avg_induced_vertical_break,
      ROUND(AVG(spin_rate), 2) as avg_spin_rate,
      ROUND(AVG(CASE WHEN hit_exit_speed IS NOT NULL THEN hit_exit_speed END), 2) as avg_exit_speed,
      ROUND(AVG(CASE WHEN hit_launch_angle IS NOT NULL THEN hit_launch_angle END), 2) as avg_launch_angle
    FROM pitches
    WHERE pitcher_id = ?
    GROUP BY pitch_type
    ORDER BY pitch_count DESC
  `;

  // Execute query with pitcher ID
  db.all(query, [pitcherId], (err, rows) => {
    if (err) {
      console.error("Error fetching pitch summary:", err);
      res.status(500).json({ error: "Failed to fetch pitch summary" });
    } else if (rows.length === 0) {
      // If no results found by ID, try searching by name as fallback
      const queryByName = `
        SELECT 
          pitch_type,
          COUNT(*) as pitch_count,
          ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as usage_percentage,
          ROUND(AVG(release_speed), 2) as avg_speed,
          ROUND(AVG(horizontal_break), 2) as avg_horizontal_break,
          ROUND(AVG(induced_vertical_break), 2) as avg_induced_vertical_break,
          ROUND(AVG(spin_rate), 2) as avg_spin_rate,
          ROUND(AVG(CASE WHEN hit_exit_speed IS NOT NULL THEN hit_exit_speed END), 2) as avg_exit_speed,
          ROUND(AVG(CASE WHEN hit_launch_angle IS NOT NULL THEN hit_launch_angle END), 2) as avg_launch_angle
        FROM pitches p
        INNER JOIN players pl ON p.pitcher_id = pl.player_id
        WHERE (pl.name_use || ' ' || pl.name_last) = ?
        GROUP BY pitch_type
        ORDER BY pitch_count DESC
      `;

      // Try with pitcher name instead of ID
      db.all(queryByName, [pitcherId], (err2, rows2) => {
        if (err2) {
          console.error("Error fetching pitch summary by name:", err2);
          res.status(500).json({ error: "Failed to fetch pitch summary" });
        } else if (rows2.length === 0) {
          res
            .status(404)
            .json({ error: "No pitch data found for this pitcher" });
        } else {
          res.json(rows2);
        }
      });
    } else {
      // Successfully found data, return it
      res.json(rows);
    }
  });
});

// ------------------------------------------
// ROUTE 3: Get pitcher details
// ------------------------------------------
// Returns basic information about a specific pitcher
app.get("/api/pitcher/:pitcherId", (req, res) => {
  const { pitcherId } = req.params;

  // Query to get pitcher information from players table
  // We check both by ID and by name for flexibility
  const query = `
    SELECT DISTINCT pl.player_id, pl.name_use || ' ' || pl.name_last
    FROM players pl
    WHERE pl.player_id = ? 
       OR pl.name_use || ' ' || pl.name_last = ?
    LIMIT 1
  `;

  // db.get returns a single row (unlike db.all which returns array)
  db.get(query, [pitcherId, pitcherId], (err, row) => {
    if (err) {
      console.error("Error fetching pitcher details:", err);
      res.status(500).json({ error: "Failed to fetch pitcher details" });
    } else if (!row) {
      res.status(404).json({ error: "Pitcher not found" });
    } else {
      res.json(row);
    }
  });
});

// ------------------------------------------
// ROUTE 4: Database structure inspection (for debugging)
// ------------------------------------------
// This endpoint helps verify the database structure is correct
app.get("/api/debug/tables", (req, res) => {
  const queries = {
    tables: "SELECT name FROM sqlite_master WHERE type='table'",
    playersStructure: "PRAGMA table_info(players)",
    pitchesStructure: "PRAGMA table_info(pitches)",
    samplePitches: "SELECT * FROM pitches LIMIT 5",
    pitchTypes: "SELECT DISTINCT pitch_type FROM pitches",
  };

  const results = {};

  // Get list of tables
  db.all(queries.tables, (err, tables) => {
    if (!err) results.tables = tables;

    // Get players table structure
    db.all(queries.playersStructure, (err, structure) => {
      if (!err) results.playersColumns = structure.map((col) => col.name);

      // Get pitches table structure
      db.all(queries.pitchesStructure, (err, structure) => {
        if (!err) results.pitchesColumns = structure.map((col) => col.name);

        // Get sample data
        db.all(queries.samplePitches, (err, samples) => {
          if (!err) results.sampleData = samples;

          // Get pitch types
          db.all(queries.pitchTypes, (err, types) => {
            if (!err) results.pitchTypes = types.map((t) => t.pitch_type);

            res.json(results);
          });
        });
      });
    });
  });
});

// ------------------------------------------
// ROUTE 5: Health check
// ------------------------------------------
// Simple endpoint to verify server is running
app.get("/api/health", (req, res) => {
  // Check if database is connected
  db.get("SELECT 1", (err) => {
    if (err) {
      res.status(503).json({
        status: "ERROR",
        message: "Database not connected",
        timestamp: new Date().toISOString(),
      });
    } else {
      res.json({
        status: "OK",
        message: "Server and database are healthy",
        timestamp: new Date().toISOString(),
      });
    }
  });
});

// ==========================================
// SERVER STARTUP
// ==========================================
app.listen(PORT, () => {
  console.log(`
    ========================================
    MLB Pitch Analysis Backend Server
    ========================================
    Server is running on: http://localhost:${PORT}
    
    Available endpoints:
    - GET /api/pitchers           - List all available pitchers
    - GET /api/pitcher/:id        - Get pitcher details
    - GET /api/pitcher/:id/summary - Get pitch statistics
    - GET /api/debug/tables       - Inspect database structure
    - GET /api/health            - Health check
    
    Make sure pitches.db is in the backend directory!
    ========================================
  `);
});

// ==========================================
// GRACEFUL SHUTDOWN HANDLER
// ==========================================
// Properly close database connection when server stops
process.on("SIGINT", () => {
  console.log("\nReceived shutdown signal, closing database connection...");
  db.close((err) => {
    if (err) {
      console.error("Error closing database:", err.message);
    } else {
      console.log("Database connection closed successfully.");
    }
    console.log("Server shut down gracefully.");
    process.exit(0);
  });
});
