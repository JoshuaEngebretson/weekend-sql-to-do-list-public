$(document).ready(onReady)

function onReady() {
  console.log('JS & JQ sourced in');

  // Get Task list and update DOM
  getAndRenderTaskList();
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

