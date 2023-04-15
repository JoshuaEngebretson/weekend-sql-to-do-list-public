const express = require('express');
const toDoListRouter = express.Router();


// DB Connection
const pool = require('../modules/pool.js');


// GET
toDoListRouter.get('/', (req, res) => {
  console.log('inside of GET /toDo');

  let sqlText = `
    SELECT * FROM "to_do_list"
    ORDER BY "created";
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


// PUT


// DELETE


module.exports = toDoListRouter;