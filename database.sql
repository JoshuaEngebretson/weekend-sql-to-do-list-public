-- 1. Create database named weekend-to-do-app

-- 2. Use the following lines of code to set up the table
CREATE TABLE "to_do_list" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (100) NOT NULL,
	"task_note" VARCHAR (250) DEFAULT '',
	"assigned_to" VARCHAR (100) NOT NULL,
	"created" DATE NOT NULL DEFAULT CURRENT_DATE,
  "completed" BOOLEAN DEFAULT FALSE,
	"completed_date" DATE DEFAULT NULL
);


-- 3. If you want some placeholder information to start off
--    enter the following into your SQL Query
INSERT INTO "to_do_list" 
	("task", "assigned_to") 
  VALUES 
	('Mow lawn', 'Joshua'),
	('Take out garbage', 'Joshua');


INSERT INTO "to_do_list" 
	("task", "task_note", "assigned_to", "created") 
  VALUES 
	('Water the plants', 'Water all, 3 ice cubes for the orchid', 'Brooke', '04-01-2023'),
	('Vacuum', 'Livingroom and Office', 'Joshua', '04-12-2023');


INSERT INTO "to_do_list" 
	("task", "task_note", "assigned_to", "created", "completed", "completed_date") 
  VALUES 
	('Do the dishes', 'Blender and knives by hand, everything else dishwasher', 'Steven', '04-10-2023', true, '04-11-2023'),
	('Walk the dog', 'Afternoon walk', 'Brooke', '04-08-2023', true, '04-08-2023');