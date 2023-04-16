# SQL To-Do List (W8)


## Description
Duration: Weekend Project (04/14/23 - 04/16/23)

Created a to-do list that will keep track of who a task is assigned to, any notes on the task, and if the task has been completed.

This was created using a SQL database to keep track of all the tasks, utilizing jQuery, and hosting the server via NODE.

## Prerequisites

- [Node.js](https://nodejs.org/en/)
    - This is for hosting the server and communicating with the database.
- [PostgreSQL](https://www.postgresql.org/)
    - This is used for hosting the database.
- [Postico](https://eggerapps.at/postico/v1.php)
    - This is used to set up your initial test database.

## Installation

1. Node module - Express and PG
    - Once Node is installed you will need to perform the following command within your terminal `npm install`. This will install the node_modules folder and install the dependencies for the app.
2. Using the information from the database.sql file, set up your initial database in Postico with the database titled `weekend-to-do-app`
3. Run `node server/server.js`
    - This will start hosting the server
4. Using your chosen browser go to [localhost:5000](http://localhost:5000/)
    - If the server is running, this will launch the to-do list app in your browser!
    - You are now able to start using the to-do list.

## Usage
To add a task to the to-do list:
1. Enter a task in the `Enter Task` field (this is a required field)
2. Enter who the task is assigned to in the `Assigned To` field (this is a required field)
3. Optionally, enter a note on the task in the `Task Note` field (this is an optional field)
4. Click on the `Add Task` button once you have filled out the pertinent information.
    - This will add the new task to the table.

To complete a task:
1. Click on the `Complete Task` button within the row of the task that you wish to complete.
    - This task will now be updated with a completed date, and a visual indicator of the row turning green to mark that the task has been completed.
    - As more tasks are completed, watch your "Tasks Completed" score rise!

To delete a task:
1. Click on the `Delete Task` button within the row of the task that you wish to complete.
2. Confirm that you want to delete the task
    - The task will now be removed from the database and the table.

## Built With
- Node.js
- jQuery.js
- PostgreSQL
- Postico

## Acknowledgement
- Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality.
- Thanks to my Dad for allowing me to talk through my code with him from time to time.

## Support
If you have suggestions or issues, please email me [here](mailto:joshua.engebretson@gmail.com).
