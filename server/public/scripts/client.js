$(document).ready(onReady)

function onReady() {
  console.log('JS & JQ sourced in');

  // Get Task list and update DOM
  getAndRenderTaskList();

  // Click listener for addTaskBtn
  $('#addTaskBtn').on('click', addTask)
}// End onReady


function getAndRenderTaskList() {
  console.log('inside of getAndRenderTaskList');

  // Reach out to server asking for the array of
  // task objects:
  $.ajax({
    method: 'GET',
    url: '/toDo'
  }).then(function(response) {
    console.log('inside of then for GET /toDo');

    // Clear out the viewToDoList table body
    $('#viewToDoList').empty();

    // Loop through the array and render each task
    //  onto the DOM
    for (let task of response) {
      if (task.completed === true) {
        $('#viewToDoList').append(`
          <tr data-id=${task.id} class="completedTask">
            <td>${task.task}</td>
            <td>${task.task_note}</td>
            <td>${task.assigned_to}</td>
            <td>${task.created}</td>
            <td><!-- This space intentionally left blank --></td>
            <td>${task.completed_date}</td>
            <td>
              <button class="deleteTaskBtn">Delete Task</button>
            </td>
          </tr>
        `)
      }
      else {
        $('#viewToDoList').append(`
          <tr data-id=${task.id}>
            <td>${task.task}</td>
            <td>${task.task_note}</td>
            <td>${task.assigned_to}</td>
            <td>${task.created}</td>
            <td>
              <button class="completeTaskBtn">Complete Task</button>
            </td>
            <td><!-- This space intentionally left blank --></td>
            <td>
              <button class="deleteTaskBtn">Delete Task</button>
            </td>
          </tr>
        `)
      }
    }

  }).catch(function(error) {
    alert('There was an error in getting the current task list')
    console.log(error);
  })
}// End getAndRenderTaskList


function addTask(event) {
  event.preventDefault();

  let task = $('#taskInput').val();
  let taskNote = $('#taskNoteInput').val();
  let assignedTo = $('#assignedToInput').val()

  if (task != '' && assignedTo != '') {
    console.log('this will work');

    let newTask = {
      task: task,
      taskNote: taskNote,
      assignedTo: assignedTo
    }
    console.log(newTask);
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
}