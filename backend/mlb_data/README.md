# MLB 2025 Pitch Data

All data is provided through a SQLite database `pitches.db` which can be used directly by your application. The database contains a `pitches` table and a `players` table.

## `players` table

This has a lookup with player names. The column `player_id` corresponds to the `pitcher_id` and `batter_id` columns in the `pitches` table.

## `pitches` table

Here are definitions for some of the columns in the pitch CSV file:

 - pitch_type: The type of the pitch (Fastball, Curveball, etc.)
 - pitch_type_abbrev: An abbreviation of the pitch type.
 - horizontal_break: The amount of spin-induced pitch break in the horizontal direction, in inches. Positive horizontal break corresponds to pitch movement towards the right from the pitcher's perspective.
 - induced_vertical_break: The amount of spin-induced pitch break in the vertical direction, in inches. Positive induced vertical break corresponds to upwards movement.
 - release_speed: pitch release speed, MPH
 - spin_rate: pitch spin rate, RPM
 - spin_axis: 2D projection of pitch spin axis. Pure top spin is 0/360 degrees (Tilt = 6:00), pure back spin is 180 degrees (tilt = 12:00).
 - tilt: The direction of spin induced pitch movement, expressed as time on a clock face. Rounded to 15 minute increments.
 - plate_location_height: The vertical location of pitch as it crosses the front of home plate, in feet above the ground.
 - plate_location_side: The horizontal location of pitch as it crosses the front of home plate. Measured in feet from the center of home plate where positive values correspond to pitch locations towards the right from the pitcher's perspective.
 - hit_exit_speed: Batted ball exit velocity in MPH
 - hit_launch_angle: Batted ball vertical launch angle, in degrees. Batted balls with positive angles are hit upwards, and batted balls with negative angles are hit towards the ground.
 - hit_launch_direction: Batted ball horizontal launch angle, in degrees. 0 degrees is up the middle, -45 degrees is down the 3B line, +45 degrees is down the 1B line.
 - hit_landing_distance: Actual (or projected) landing distance of the batted ball, in feet.
 - hit_landing_angle: Horizontal angle towards the actual or projected landing location of a batted ball. 0 degrees is up the middle, -45 degrees is down the 3B line, +45 degrees is down the 1B line.
 - hit_hang_time: The time in seconds between batted ball contact and the actual (or projected) landing time of batted ball.
