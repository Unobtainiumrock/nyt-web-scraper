
$(document).on('click', '.add-note', function() {
  $('#notes').empty();
  const thisId = $(this).attr('data-id');
  
  $.get(`/threads/${thisId}`)
    .then(function(data) {
      console.log(data);
      // The title of the article
      $('#notes').append(`<h2>${data.headLine}</h2>`);
      // An input to enter a new title
      $('#notes').append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $('#notes').append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $('#notes').append(`<button class='btn btn-danger' data-id=${data._id} id='savenote'>Save Note</button>`);

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $('#titleinput').val(data.note.title);
        // Place the body of the note in the body textarea
        $('#bodyinput').val(data.note.body);
      }
    });
});

$(document).on('click', '#savenote', function() {
  const thisId = $(this).attr('data-id');
  const title = $('#titleinput').val();
  const body = $('#bodyinput').val();
  // Run a POST request to change the note, using what's entered in the inputs
  $.post(`/threads/${thisId}`, { title, body })
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $('#notes').empty();
    });
  // Also, remove the values entered in the input and textarea for note entry
  $('#titleinput').val('');
  $('#bodyinput').val('');
});
