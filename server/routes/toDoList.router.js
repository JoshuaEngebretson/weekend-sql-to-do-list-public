const express = require('express');
const toDoListRouter = express.Router();


// DB Connection
const pool = require('../modules/pool.js');


// GET
toDoListRouter.get('/', (req, res) => {
  console.log('inside of GET /toDo');

  let sqlText = `
    SELECT * FROM "to_do_list"
    ORDER BY "id";
  `;

  pool.query(sqlText)
    .then((dbRes) => {
      let taskList = dbRes.rows;
      res.send(taskList);
    })
    .catch((dbErr) => {
      // Log that there was an issue inside of this function
      console.log('SQL query in GET /toDo failed:', dbErr);
      // Send "Internal Server Error" status to client
      res.sendStatus(500);
    })
})


// POST
toDoListRouter.post('/', (req, res) => {
  let newTask = req.body;
  let sqlText = `
    INSERT INTO "to_do_list"
      ("task", "task_note", "assigned_to")
      Values
      ($1, $2, $3);
  `;
  let sqlValues = [
    newTask.task,
    newTask.taskNote,
    newTask.assignedTo
  ];

  // Send sanitized sql inputs to the database
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      // Send "Created" status to client.js
      res.sendStatus(201)
    })
    .catch((dbErr) => {
      // Log the error sent back from SQL database
      console.log('Error adding new task:', dbErr);
      // Send "Internal Server Error" status to client.js
      res.sendStatus(500);
    })
})


// PUT
toDoListRouter.put('/:id', (req, res) => {
  let idToUpdate = req.params.id;
  let completedTask = req.body.completed;

  let sqlText = `
    UPDATE "to_do_list"
      SET "completed"=$1, "completed_date"=CURRENT_DATE
      WHERE "id"=$2;
  `;
  let sqlValues = [completedTask, idToUpdate];

  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      // Send "Okay" status to client
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      // Log that there was an issue inside of this function
      console.log('SQL query in PUT /toDo/:id failed:', dbErr);
      // Send "Internal Server Error" status to client
      res.sendStatus(500);
    })
})


// DELETE
toDoListRouter.delete('/:id', (req, res) => {
  let idToDelete = req.params.id;

  let sqlText = `
    DELETE FROM "to_do_list"
      WHERE "id"=$1;
  `;
  let sqlValues = [idToDelete];

  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      // Send "Okay" status to client
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      // Log that there was an issue inside of this function
      console.log('SQL query in DELETE /toDo/:id failed:', dbErr);
      // Send "Internal Server Error" status to client
      res.sendStatus(500);
    })
})


module.exports = toDoListRouter;