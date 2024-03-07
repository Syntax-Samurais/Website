CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user_interests CASCADE;
DROP TABLE IF EXISTS goals CASCADE;
DROP TABLE IF EXISTS weight_history CASCADE;
DROP TABLE IF EXISTS run_history CASCADE;
DROP TABLE IF EXISTS calorie_history CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE user_interests (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  increase_running BOOLEAN DEFAULT false,
  lose_weight BOOLEAN DEFAULT false,
  maintain_weight BOOLEAN DEFAULT false,
  gain_weight BOOLEAN DEFAULT false
);

CREATE TABLE goals (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  date DATE DEFAULT CURRENT_DATE,
  goal_weight INTEGER,
  weight_goal_date DATE,
  initial_weekly_miles INTEGER,
  goal_weekly_miles INTEGER,
  initial_calorie_intake INTEGER,
  goal_calorie_intake INTEGER
);

CREATE TABLE weight_history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  date DATE DEFAULT CURRENT_DATE,
  weight DECIMAL(6, 2)
);

CREATE TABLE run_history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  date DATE DEFAULT CURRENT_DATE,
  miles_ran DECIMAL(6, 2),
  run_time VARCHAR(255)
);

CREATE TABLE calorie_history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  date DATE DEFAULT CURRENT_DATE,
  calories INTEGER
);

\i seed.sql