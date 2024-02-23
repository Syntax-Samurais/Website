DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user-interests CASCADE;
DROP TABLE IF EXISTS goals CASCADE;
DROP TABLE IF EXISTS weight-history CASCADE;
DROP TABLE IF EXISTS run-history CASCADE;
DROP TABLE IF EXISTS calorie-history CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
);

CREATE TABLE user-interests (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  imporve_running BOOLEAN,
  increase_running BOOLEAN,
  increase_weight BOOLEAN,
  lose_weight BOOLEAN,
  maintain_weight BOOLEAN,
  gain_weight BOOLEAN,
);

CREATE TABLE goals (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  date DATE NOT NULL,
  weekly_miles INTEGER,
  daily_calories INTEGER,
  weight INTEGER,
);

CREATE TABLE weight-history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  date DATE NOT NULL,
  weight DECIMAL(4, 2)[],
);

CREATE TABLE run-history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  date DATE NOT NULL,
  miles DECIMAL(3, 2)[],
);

CREATE TABLE calorie-history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  date DATE NOT NULL,
  calories INTEGER,
);
