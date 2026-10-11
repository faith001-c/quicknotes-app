// Select elements
var noteForm = document.getElementById("note-form");
var noteInput = document.getElementById("note-input");
var categorySelect = document.getElementById("category-select");
var errorMessage = document.getElementById("error-message");
var noteCount = document.getElementById("note-count");
var notesList = document.getElementById("notes-list");

// All notes live in this array
var notes = [];

// Show how many notes there are
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = "You have " + notes.length + " notes.";
  }
}

// Remove the note with this id
function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  renderNotes();
}

// Draw every note on the page
function renderNotes() {
  notesList.innerHTML = "";

  notes.forEach(function (note) {
    var li = document.createElement("li");
    li.className = "note-card category-" + note.category.toLowerCase();

    var text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    var meta = document.createElement("div");
    meta.className = "note-meta";

    var label = document.createElement("span");
    label.className = "category-label";
    label.textContent = note.category;

    var date = document.createElement("span");
    date.className = "note-date";
    date.textContent = note.createdAt;

    var deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteNote(note.id);
    });

    meta.appendChild(label);
    meta.appendChild(date);
    meta.appendChild(deleteBtn);

    li.appendChild(text);
    li.appendChild(meta);
    notesList.appendChild(li);
  });

  updateCount();
}

// Add a note when the form is submitted
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var text = noteInput.value.trim();

  // Validation
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  var note = {
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString()
  };

  notes.push(note);
  renderNotes();

  noteInput.value = "";
  noteInput.focus();
});

renderNotes();