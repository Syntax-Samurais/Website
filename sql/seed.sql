INSERT INTO users (id, username, password) VALUES 
(1, 'lfishleigh0', crypt('1234', gen_salt('bf'))),
(2, 'bvanbruggen1', crypt('1234', gen_salt('bf'))),
(3, 'mhaswall2', crypt('1234', gen_salt('bf'))),
(4, 'ecarlyon3', crypt('1234', gen_salt('bf'))),
(5, 'bbenner4', crypt('1234', gen_salt('bf'))),
(6, 'gcoggins5', crypt('1234', gen_salt('bf'))),
(7, 'mgairdner6', crypt('1234', gen_salt('bf'))),
(8, 'jnation7', crypt('1234', gen_salt('bf'))),
(9, 'fstilling8', crypt('1234', gen_salt('bf'))),
(10, 'dcopes9', crypt('1234', gen_salt('bf')));

INSERT INTO user_interests (user_id, improve_pace, increase_running, increase_weight, lose_weight, maintain_weight, gain_weight) VALUES
  (1, true, false, false, true, false, false),
  (2, false, true, false, true, false, false),
  (3, true, true, false, false, true, false),
  (4, false, false, true, false, false, true),
  (5, true, false, true, false, false, false),
  (6, false, true, false, true, false, false),
  (7, true, true, true, false, false, false),
  (8, false, false, false, true, false, false),
  (9, true, false, false, false, true, false),
  (10, false, true, false, true, false, false);

-- Date Range for seed data is 2024-01-01 thru 2024-02-22 
INSERT INTO goals (user_id, goal_weight, weight_goal_date, initial_weekly_miles, goal_weekly_miles, initial_calorie_intake, goal_calorie_intake)
VALUES
  (1, NULL, NULL, 15, 20, 2000, 1800),
  (2, NULL, NULL, 20, 25, 2200, 2000),
  (3, NULL, NULL, 25, 30, 2400, 2200),
  (4, 180, '2024-12-31', 10, 15, 2500, 2300),
  (5, 160, '2024-12-31', 12, 18, 2200, 2000),
  (6, NULL, NULL, 18, 22, 2300, 2100),
  (7, 200, '2024-12-31', 22, 28, 2500, 2300),
  (8, NULL, NULL, 15, 20, 2000, 1800),
  (9, 170, '2024-12-31', 20, 25, 2200, 2000),
  (10, NULL, NULL, 25, 30, 2400, 2200);

INSERT INTO run_history (user_id, date, miles_ran, run_time)
VALUES
  -- User 1
  (1, '2024-02-21', 3.5, '00:45:00'),
  (1, '2024-02-22', 4.2, '00:50:00'),
  (1, '2024-02-23', 3.0, '00:40:00'),

  -- User 2
  (2, '2024-02-21', 5.0, '01:00:00'),
  (2, '2024-02-22', 4.8, '00:55:00'),
  (2, '2024-02-23', 6.2, '01:10:00'),

  -- User 3
  (3, '2024-02-21', 4.0, '00:55:00'),
  (3, '2024-02-22', 3.5, '00:50:00'),
  (3, '2024-02-23', 5.5, '01:05:00'),


  (6, '2024-02-21', 4.5, '00:55:00'),
  (6, '2024-02-22', 5.0, '01:00:00'),
  (6, '2024-02-23', 4.2, '00:50:00');


INSERT INTO calorie_history (user_id, date, calories)
VALUES
  -- User 1
  (1, '2024-02-21', 2000),
  (1, '2024-02-22', 1800),
  (1, '2024-02-23', 1900),
  
  -- User 2
  (2, '2024-02-21', 2200),
  (2, '2024-02-22', 2000),
  (2, '2024-02-23', 2100),
  
  -- User 3
  (3, '2024-02-21', 2400),
  (3, '2024-02-22', 2200),
  (3, '2024-02-23', 2300),
  
  -- User 4
  (4, '2024-02-21', 2500),
  (4, '2024-02-22', 2400),
  (4, '2024-02-23', 2300),
  
  -- User 5
  (5, '2024-02-21', 2200),
  (5, '2024-02-22', 2000),
  (5, '2024-02-23', 2100),
  
  -- User 6
  (6, '2024-02-21', 2300),
  (6, '2024-02-22', 2100),
  (6, '2024-02-23', 2200),
  
  -- User 7
  (7, '2024-02-21', 2500),
  (7, '2024-02-22', 2400),
  (7, '2024-02-23', 2300),
  
  -- User 8
  (8, '2024-02-21', 2000),
  (8, '2024-02-22', 1800),
  (8, '2024-02-23', 1900),
  
  -- User 9
  (9, '2024-02-21', 2200),
  (9, '2024-02-22', 2000),
  (9, '2024-02-23', 2100),
  
  -- User 10
  (10, '2024-02-21', 2400),
  (10, '2024-02-22', 2200),
  (10, '2024-02-23', 2300);



-- WEIGHT HISTORY ========================================
INSERT INTO weight_history (user_id, date, weight) VALUES
-- User 1
 (1,'2024-01-11', 152.98),
 (1,'2024-01-03', 157.85),
 (1,'2024-01-16', 164.92),
 (1,'2024-01-01', 172.32),
 (1,'2024-01-16', 159.05),
 (1,'2024-01-15', 174.03),
 (1,'2024-02-14', 152.19),
 (1,'2024-01-04', 153.97),
 (1,'2024-02-16', 164.2),
 (1,'2024-02-14', 152.55),
 (1,'2024-02-16', 155.17),
 (1,'2024-02-12', 162.39),
 (1,'2024-02-21', 167.45),
 (1,'2024-01-31', 169.18),
 (1,'2024-01-08', 165.93),
 (1,'2024-02-07', 156.55),
 (1,'2024-01-30', 154.85),
 (1,'2024-01-16', 152.75),
 (1,'2024-01-01', 172.85),
 (1,'2024-01-29', 162.55),
 (1,'2024-01-23', 165.32),
 (1,'2024-01-06', 166.72),
 (1,'2024-01-11', 168),
 (1,'2024-01-14', 167.52),
 (1,'2024-01-31', 150.0),
 (1,'2024-01-06', 163.49),
 (1,'2024-01-26', 157.04),
 (1,'2024-01-27', 152.54),
 (1,'2024-02-18', 169.68),
 (1,'2024-02-11', 164.08),
 --User 2
  (2,'2024-01-12', 170.77),
  (2,'2024-02-05', 166.67),
  (2,'2024-01-01', 174.28),
  (2,'2024-01-03', 170.69),
  (2,'2024-02-06', 174.8),
  (2,'2024-01-07', 153.82),
  (2,'2024-01-27', 171.08),
  (2,'2024-01-01', 154.08),
  (2,'2024-02-18', 156.48),
  (2,'2024-01-24', 153),
  (2,'2024-02-13', 163.51),
  (2,'2024-01-17', 159.01),
  (2,'2024-02-20', 173.5),
  (2,'2024-02-16', 172.91),
  (2,'2024-01-07', 167),
  (2,'2024-02-19', 169.27),
  (2,'2024-01-27', 151.63),
  (2,'2024-02-03', 153.89),
  (2,'2024-01-11', 151.35),
  (2,'2024-01-12', 171.49),
  (2,'2024-02-11', 158.67),
  (2,'2024-01-08', 153.85),
  (2,'2024-02-07', 173.25),
  (2,'2024-02-07', 158.94),
  (2,'2024-01-27', 156.54),
  (2,'2024-01-19', 151.43),
  (2,'2024-02-19', 171.97),
  (2,'2024-01-10', 155.88),
  (2,'2024-02-14', 163.54),
  (2,'2024-02-09', 171.2),
  --User 3
  (3,'2024-01-13', 168),
  (3,'2024-02-08', 164.71),
  (3,'2024-01-15', 165.04),
  (3,'2024-02-02', 156.58),
  (3,'2024-02-11', 154),
  (3,'2024-02-02', 152.83),
  (3,'2024-01-24', 167.14),
  (3,'2024-02-18', 159.75),
  (3,'2024-02-15', 152.05),
  (3,'2024-02-08', 161.87),
  (3,'2024-01-27', 162.94),
  (3,'2024-01-08', 150.04),
  (3,'2024-01-12', 166.43),
  (3,'2024-01-04', 155.69),
  (3,'2024-01-30', 168),
  (3,'2024-01-22', 171.32),
  (3,'2024-01-24', 159.04),
  (3,'2024-02-11', 169.65),
  (3,'2024-02-02', 172.78),
  (3,'2024-01-19', 172.07),
  (3,'2024-02-17', 169.04),
  (3,'2024-01-28', 166.14),
  (3,'2024-01-21', 163.63),
  (3,'2024-02-10', 156.58),
  (3,'2024-01-11', 160.69),
  (3,'2024-02-19', 172.17),
  (3,'2024-01-04', 165.83),
  (3,'2024-01-14', 172.8),
  (3,'2024-01-06', 174.22),
  (3,'2024-02-11', 159.44),
  --User 4
  (4, '2024-02-03', 151.88),
  (4, '2024-01-31', 172.1),
  (4, '2024-01-13', 174),
  (4, '2024-02-03', 157.31),
  (4, '2024-01-10', 170.01),
  (4, '2024-02-18', 172.68),
  (4, '2024-01-19', 167.8),
  (4, '2024-01-15', 174.08),
  (4, '2024-02-20', 169.41),
  (4, '2024-01-07', 150.91),
  (4, '2024-01-25', 173.72),
  (4, '2024-01-23', 154),
  (4, '2024-01-02', 155.88),
  (4, '2024-01-30', 164.15),
  (4, '2024-01-17', 163.27),
  (4, '2024-01-13', 172.97),
  (4, '2024-01-23', 174.34),
  (4, '2024-01-21', 162.99),
  (4, '2024-02-05', 152.58),
  (4, '2024-01-02', 164.27),
  (4, '2024-01-19', 171.89),
  (4, '2024-02-16', 164.82),
  (4, '2024-01-13', 165.43),
  (4, '2024-01-02', 154.08),
  (4, '2024-02-12', 168.84),
  (4, '2024-01-10', 170.02),
  (4, '2024-02-19', 156.7),
  (4, '2024-02-21', 173.55),
  (4, '2024-02-11', 173.69),
  (4, '2024-01-12', 150.03),
-- User 5
(5,'2024-01-31', 153.95),
(5,'2024-01-04', 165.64),
(5,'2024-01-25', 154.3),
(5,'2024-01-06', 161),
(5,'2024-01-30', 158.7),
(5,'2024-01-10', 151.79),
(5,'2024-02-05', 161.01),
(5,'2024-01-22', 165.91),
(5,'2024-02-19', 160),
(5,'2024-02-19', 166.2),
(5,'2024-02-08', 162),
(5,'2024-01-19', 165.27),
(5,'2024-02-15', 171.01),
(5,'2024-01-28', 150.41),
(5,'2024-01-19', 151.92),
(5,'2024-01-02', 171.12),
(5,'2024-01-17', 171.48),
(5,'2024-02-09', 154.81),
(5,'2024-01-11', 168.47),
(5,'2024-02-19', 174.95),
(5,'2024-01-27', 156),
(5,'2024-01-11', 163.03),
(5,'2024-02-03', 162.79),
(5,'2024-01-04', 173.17),
(5,'2024-01-12', 150.19),
(5,'2024-02-02', 157.09),
(5,'2024-01-11', 173.2),
(5,'2024-02-13', 162.44),
(5,'2024-02-09', 156.91),
(5,'2024-01-30', 165.67),
-- User 6
(6, '2024-02-05', 223.6),
(6, '2024-01-18', 226.19),
(6, '2024-01-05', 206.81),
(6, '2024-02-03', 201.03),
(6, '2024-01-13', 205.47),
(6, '2024-02-16', 229.15),
(6, '2024-01-18', 205.12),
(6, '2024-01-03', 212.27),
(6, '2024-01-18', 227.34),
(6, '2024-01-19', 221.5),
(6, '2024-02-08', 205.74),
(6, '2024-01-16', 223.68),
(6, '2024-02-06', 221.53),
(6, '2024-01-24', 201.19),
(6, '2024-01-05', 207.09),
(6, '2024-01-07', 215.7),
(6, '2024-01-29', 212.47),
(6, '2024-01-29', 203.21),
(6, '2024-02-15', 227.06),
(6, '2024-02-15', 209.91),
(6, '2024-01-08', 204.76),
(6, '2024-01-10', 227.54),
(6, '2024-01-09', 215.41),
(6, '2024-02-03', 220.02),
(6, '2024-01-01', 211.37),
(6, '2024-01-22', 222.37),
(6, '2024-02-20', 202.46),
(6, '2024-02-18', 211.1),
(6, '2024-02-03', 202.66),
(6, '2024-01-15', 222.9),
-- User 7
(7, '2024-01-15', 203.32),
(7, '2024-02-18', 204.61),
(7, '2024-02-04', 199.19),
(7, '2024-02-17', 208.7),
(7, '2024-02-16', 192.76),
(7, '2024-02-21', 194.68),
(7, '2024-01-03', 191.81),
(7, '2024-02-13', 191.02),
(7, '2024-01-09', 194.23),
(7, '2024-02-05', 206.27),
(7, '2024-02-10', 214.8),
(7, '2024-02-11', 198.6),
(7, '2024-01-25', 193.44),
(7, '2024-02-11', 206.28),
(7, '2024-02-08', 197.33),
(7, '2024-01-21', 191.22),
(7, '2024-01-17', 213.22),
(7, '2024-01-31', 207.63),
(7, '2024-02-15', 214.88),
(7, '2024-02-11', 200.19),
(7, '2024-01-01', 204.85),
(7, '2024-02-16', 208.54),
(7, '2024-01-07', 196.87),
(7, '2024-02-18', 196.81),
(7, '2024-02-02', 199.38),
(7, '2024-01-02', 211.61),
(7, '2024-02-03', 202.2),
(7, '2024-02-14', 191.91),
(7, '2024-02-20', 213.59),
(7, '2024-01-14', 210.47),
-- User 8
(8, '2024-01-12', 185.75),
(8, '2024-02-11', 193.28),
(8, '2024-01-03', 182.46),
(8, '2024-01-10', 185.04),
(8, '2024-02-04', 186.91),
(8, '2024-01-04', 189.21),
(8, '2024-02-15', 180.9),
(8, '2024-02-20', 197.44),
(8, '2024-01-21', 199.89),
(8, '2024-02-12', 193.41),
(8, '2024-02-16', 181.65),
(8, '2024-01-08', 191.18),
(8, '2024-02-18', 193.46),
(8, '2024-01-05', 185.86),
(8, '2024-01-22', 198.6),
(8, '2024-01-06', 200.78),
(8, '2024-01-11', 200.68),
(8, '2024-01-01', 196.51),
(8, '2024-01-19', 197.32),
(8, '2024-01-13', 193.87),
(8, '2024-01-19', 183.48),
(8, '2024-02-14', 184.69),
(8, '2024-02-15', 197.37),
(8, '2024-02-21', 193.75),
(8, '2024-01-30', 197.31),
(8, '2024-01-19', 184.13),
(8, '2024-01-02', 182.46),
(8, '2024-01-20', 184.72),
(8, '2024-02-18', 199.81),
(8, '2024-01-23', 198.35),
-- User 9
(9, '2024-01-27', 148.82),
(9, '2024-02-12', 146.94),
(9, '2024-02-08', 152.01),
(9, '2024-01-05', 162.87),
(9, '2024-02-19', 168.13),
(9, '2024-01-07', 162.64),
(9, '2024-01-24', 148.23),
(9, '2024-02-08', 157.48),
(9, '2024-02-17', 151.58),
(9, '2024-01-02', 162.4),
(9, '2024-01-03', 166.5),
(9, '2024-02-14', 160.91),
(9, '2024-01-07', 155.59),
(9, '2024-01-07', 160.71),
(9, '2024-01-31', 156.43),
(9, '2024-02-07', 148.44),
(9, '2024-02-18', 157.58),
(9, '2024-01-16', 159.02),
(9, '2024-02-21', 152.74),
(9, '2024-02-09', 153.88),
(9, '2024-01-07', 147.5),
(9, '2024-01-21', 161.55),
(9, '2024-01-08', 151.19),
(9, '2024-02-03', 148.49),
(9, '2024-01-13', 168.93),
(9, '2024-01-10', 149.33),
(9, '2024-01-13', 148.14),
(9, '2024-02-08', 165.04),
(9, '2024-01-03', 156.73),
(9, '2024-02-04', 162.79),
-- User 10
(10, '2024-02-13', 149.23),
(10, '2024-02-11', 153.07),
(10, '2024-01-20', 169.45),
(10, '2024-02-21', 162.94),
(10, '2024-02-18', 158.55),
(10, '2024-01-07', 146.85),
(10, '2024-01-21', 149.47),
(10, '2024-01-02', 147.32),
(10, '2024-02-06', 155.49),
(10, '2024-02-12', 146.48),
(10, '2024-01-10', 168.72),
(10, '2024-02-20', 155.92),
(10, '2024-02-03', 150.3),
(10, '2024-01-23', 163.03),
(10, '2024-02-01', 165.27),
(10, '2024-02-13', 163.72),
(10, '2024-02-12', 146.45),
(10, '2024-01-26', 157.61),
(10, '2024-01-28', 152.44),
(10, '2024-02-06', 149.43),
(10, '2024-01-05', 152.63),
(10, '2024-01-01', 150.51),
(10, '2024-01-23', 148.43),
(10, '2024-01-14', 153.82),
(10, '2024-02-04', 154.39),
(10, '2024-01-03', 163.26),
(10, '2024-01-18', 153.61),
(10, '2024-01-11', 149.59),
(10, '2024-01-19', 154.14);

-- CALORIE HISTORY ======================================================================================================

