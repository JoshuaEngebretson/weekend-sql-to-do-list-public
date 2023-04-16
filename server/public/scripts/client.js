$(document).ready(onReady)

function onReady() {

  // Get Task list and update DOM
  getAndRenderTaskList();

  // Click listener for addTaskBtn
  $('#addTaskBtn').on('click', addTask);

  // Click listener for completeTaskBtn
  $('#viewToDoList').on('click', '.completeTaskBtn', completeTask);

  // Click listener for deleteTaskBtn
  $('#viewToDoList').on('click', '.deleteTaskBtn', deleteTask);

}// End onReady


function getAndRenderTaskList() {

  // Reach out to server asking for the array of
  // task objects:
  $.ajax({
    method: 'GET',
    url: '/toDo'
  }).then(function(response) {

    // Clear out the viewToDoList table body
    $('#viewToDoList').empty();

    // Clear out numberTasksCompleted
    $('#numberTasksCompleted').empty();

    let numCompleted = 0;

    // Loop through the array and render each task
    //  onto the DOM
    for (let task of response) {
      if (task.completed === true) {
        $('#viewToDoList').append(`
          <tr data-id=${task.id} class="completedTask">
            <td>${task.task}</td>
            <td>${task.task_note}</td>
            <td>${task.assigned_to}</td>
            <td class="center-date">${task.created}</td>
            <td><!-- This space intentionally left blank --></td>
            <td class="center-date">${task.completed_date}</td>
            <td>
              <button class="deleteTaskBtn center">Delete Task</button>
            </td>
          </tr>
        `)
        numCompleted++
      } // End if task is completed
      else {
        $('#viewToDoList').append(`
          <tr data-id=${task.id}>
            <td>${task.task}</td>
            <td>${task.task_note}</td>
            <td>${task.assigned_to}</td>
            <td class="center-date">${task.created}</td>
            <td>
              <button class="completeTaskBtn center">Complete Task</button>
            </td>
            <td><!-- This space intentionally left blank --></td>
            <td>
              <button class="deleteTaskBtn center">Delete Task</button>
            </td>
          </tr>
        `)
      }// End if task is NOT completed
    }

    // Update numberTasksCompleted on DOM to current number
    //  completed in database
    $('#numberTasksCompleted').text(`${numCompleted}`)
    
  }).catch(function(error) {
    alert('There was an error in getting the current task list')
    console.log(error);
  })

}// End getAndRenderTaskList


// Handle click event on addTaskBtn
//  1. Check if required fields are filled
//      if not filled, alert user
//  2. Call on postTask to send newTask 
//      to the database
//        1. Will update DOM if successful
//            then clear inputs
//        2. Will alert user if unsuccessful
//            leave inputs filled in
function addTask(event) {

  event.preventDefault();

  let task = $('#taskInput').val();
  let taskNote = $('#taskNoteInput').val();
  let assignedTo = $('#assignedToInput').val();

  // Check if required fields are filled in.
  //  If not, provide alert to the user.
  if (task != '' && assignedTo != '') {
    // Create newTask object to send to DB
    let newTask = {
      task: task,
      taskNote: taskNote,
      assignedTo: assignedTo
    };

    // POST request to Server if successful
    //  will empty out input fields
    postTask(newTask);
  }
  else {// Alert the User why addTaskBtn didn't work
    // If nothing in Enter Task but Assigned To filled in
    if (task == '' && assignedTo != '') {
      alert('"Enter Task" is a required field');
    }
    // If nothing in Assigned To but Enter Task To filled in
    else if (task != '' && assignedTo == '') {
      alert('"Assigned To" is a required field');
    }
    // Else both fields are empty
    else {
      alert('Both "Enter Task" AND "Assigned To" are required fields');
    }
  }
}// End addTask


// POST request to Server 
//  if successful
//    1. Will empty out input fields
//    2. Clear out input fields
//  if unsuccessful
//    1. Alert user that an error has occured
function postTask(taskToSend) {

  // ajax POST of data to server
  $.ajax({
    method: 'POST',
    url: '/toDo',
    data: taskToSend
  }).then(function (response){

    console.log(response);
    getAndRenderTaskList();
    // Empty out input fields
    $('#taskInput').val('');
    $('#taskNoteInput').val('');
    $('#assignedToInput').val('');

  }).catch(function (error) {

    alert('There was an error adding this task, please try again later')
    console.log('the /toDo POST request failed with error:', error);

  });
}// End postTask


// PUT request to Server
//  if successful
//    1. Will remove Complete Task button from DOM
//        for this row
//    2. Will adjust row color to green
//  if unsuccessful
//    1. Alert user that an error has occured
function completeTask() {
  // Grab the data-id from the row this button is in
  let idToUpdate = $(this).parent().parent().data('id');

  $.ajax({
    method: 'PUT',
    url: `/toDo/${idToUpdate}`,
    data: {
      completed: true
    }
  }).then(function (response) {

    // Update the DOM with new taskList
    getAndRenderTaskList();

  }).catch(function (error) {

    alert('There was an error completing this task, please try again later')
    console.log('the /toDo PUT request failed with error:', error);

  })
}// End completeTask


// DELETE request to Server
//  if successful
//    1. Will remove entire task from database
//    2. Will render updated taskList to DOM
//  if unsuccessful
//    1. Alert user that an error has occured
function deleteTask() {
  // Grab the data-id from the row this button is in
  let idToDelete = $(this).parent().parent().data('id');

  // Confirm user wants to delete this task, if they want to proceed
  //  delete the task from the database and update the DOM.
  if (confirm(`Click "OK" if you're sure you want to delete this task.`)) {
    $.ajax({
      method: 'DELETE',
      url: `/toDo/${idToDelete}`
    }).then(function (response) {
  
      // Update the DOM with new taskList
      getAndRenderTaskList();
  
    }).catch(function (error) {
  
      alert('There was an error deleting this task, please try again later')
      console.log('the /toDo DELETE request failed with error:', error);
  
    })
  }
}// End deleteTask