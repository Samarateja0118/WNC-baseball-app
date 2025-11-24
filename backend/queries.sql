-- ==========================================
-- SAMPLE SQL QUERIES FOR TESTING MLB PITCH DATABASE
-- ==========================================

-- ==========================================
-- PITCHER QUERIES
-- ==========================================

-- Get the 10 required pitchers with their IDs
SELECT DISTINCT 
  pitches.pitcher_id AS player_id,
  players.name_use || ' ' || players.name_last AS name
FROM pitches
INNER JOIN players ON pitches.pitcher_id = players.player_id
WHERE players.name_use || ' ' || players.name_last IN (${pitcherNames.map(() => "?").join(",")})
ORDER BY name;

-- ==========================================
-- PITCH SUMMARY STATISTICS (Main Query)
-- ==========================================

SELECT 
  pitch_type,
  COUNT(*) AS pitch_count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) AS usage_percentage,
  ROUND(AVG(release_speed), 2) AS avg_speed,
  ROUND(AVG(horizontal_break), 2) AS avg_horizontal_break,
  ROUND(AVG(induced_vertical_break), 2) AS avg_induced_vertical_break,
  ROUND(AVG(spin_rate), 2) AS avg_spin_rate,
  ROUND(AVG(CASE WHEN hit_exit_speed IS NOT NULL THEN hit_exit_speed END), 2) AS avg_exit_speed,
  ROUND(AVG(CASE WHEN hit_launch_angle IS NOT NULL THEN hit_launch_angle END), 2) AS avg_launch_angle
FROM pitches
WHERE pitcher_id = ?
GROUP BY pitch_type
ORDER BY pitch_count DESC;

-- ==========================================
-- DATABASE STRUCTURE QUERIES
-- ==========================================

SELECT name FROM sqlite_master WHERE type='table';
PRAGMA table_info(pitches);
PRAGMA table_info(players);
SELECT * FROM pitches LIMIT 0;

-- ==========================================
-- DATA EXPLORATION
-- ==========================================

SELECT * FROM pitches LIMIT 5;
SELECT * FROM players LIMIT 5;

SELECT COUNT(*) AS total_pitches FROM pitches;

SELECT DISTINCT pitch_type, COUNT(*) AS count
FROM pitches
GROUP BY pitch_type
ORDER BY count DESC;

SELECT DISTINCT pitch_type, pitch_type_abbrev
FROM pitches
WHERE pitch_type_abbrev IS NOT NULL
ORDER BY pitch_type;

SELECT 
  p.pitcher_id,
  pl.name_use || ' ' || pl.name_last AS name,
  COUNT(*) AS total_pitches
FROM pitches p
JOIN players pl ON p.pitcher_id = pl.player_id
GROUP BY p.pitcher_id, name
ORDER BY total_pitches DESC
LIMIT 20;

-- ==========================================
-- ADVANCED ANALYSIS
-- ==========================================

SELECT 
  pl.name_use || ' ' || pl.name_last AS name,
  ROUND(AVG(p.release_speed), 2) AS avg_velocity,
  COUNT(*) AS pitch_count
FROM pitches p
JOIN players pl ON p.pitcher_id = pl.player_id
GROUP BY p.pitcher_id, name
HAVING pitch_count > 100
ORDER BY avg_velocity DESC
LIMIT 10;

SELECT 
  pl.name_use || ' ' || pl.name_last AS name,
  pitch_type,
  ROUND(AVG(spin_rate), 0) AS avg_spin,
  COUNT(*) AS pitch_count
FROM pitches p
JOIN players pl ON p.pitcher_id = pl.player_id
WHERE spin_rate IS NOT NULL
GROUP BY p.pitcher_id, name, pitch_type
HAVING pitch_count > 50
ORDER BY avg_spin DESC
LIMIT 20;

SELECT 
  pitch_type,
  COUNT(*) AS total_pitches,
  COUNT(hit_exit_speed) AS hits,
  ROUND(COUNT(hit_exit_speed) * 100.0 / COUNT(*), 2) AS hit_percentage,
  ROUND(AVG(hit_exit_speed), 2) AS avg_exit_velo,
  ROUND(AVG(hit_launch_angle), 2) AS avg_launch_angle
FROM pitches
WHERE pitch_type IS NOT NULL
GROUP BY pitch_type
HAVING total_pitches > 100
ORDER BY hit_percentage DESC;

-- ==========================================
-- VERIFY THE 10 REQUIRED PITCHERS
-- ==========================================

SELECT 
  pl.name_use || ' ' || pl.name_last AS name,
  COUNT(p.pitcher_id) AS pitch_count,
  COUNT(DISTINCT p.pitch_type) AS pitch_types
FROM players pl
LEFT JOIN pitches p ON pl.player_id = p.pitcher_id
WHERE (pl.name_use || ' ' || pl.name_last) IN (
  'Logan Webb',
  'Carlos Rodón',
  'Garrett Crochet',
  'Zac Gallen',
  'Max Fried',
  'Jake Irvin',
  'MacKenzie Gore',
  'Brad Lord',
  'Jose A. Ferrer',
  'Matt Waldron'
)
GROUP BY name
ORDER BY name;
