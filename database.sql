-- 1. Create database named weekend-to-do-app

-- 2. Use the following lines of code to set up the table
CREATE TABLE "to_do_list" (
	"id" SERIAL PRIMARY KEY,
	"task_note" VARCHAR (250) NOT NULL,
	"assigned_to" VARCHAR (100) NOT NULL,
	"created" DATE NOT NULL DEFAULT CURRENT_DATE,
	"completed" DATE DEFAULT NULL
);

-- 3. If you want some placeholder information to start off
--    enter the following into your SQL Query
INSERT INTO "to_do_list" 
	("task_note", "assigned_to") 
  VALUES 
	('Mow lawn', 'Joshua'),
	('Take out garbage', 'Joshua'),
	('Walk the dog', 'Brooke');

INSERT INTO "to_do_list" 
	("task_note", "assigned_to", "created") 
  VALUES 
	('Water the plants', 'Brooke', '04-01-2023');

INSERT INTO "to_do_list" 
	("task_note", "assigned_to", "created", "completed") 
  VALUES 
	('Do the dishes', 'Steven', '04-10-2023', '04-11-2023'),
  ('Vacuum the livingroom', 'Joshua', '04-08-2023', '04-09-2023');