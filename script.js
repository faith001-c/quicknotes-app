// Select elements
var noteForm = document.getElementById("note-form");
var noteInput = document.getElementById("note-input");
var categorySelect = document.getElementById("category-select");
var errorMessage = document.getElementById("error-message");
var searchInput = document.getElementById("search-input");
var noteCount = document.getElementById("note-count");
var notesList = document.getElementById("notes-list");

var STORAGE_KEY = "quicknotesNotes";

// All notes live in this array
var notes = [];

// Save the notes to localStorage
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// Load the notes from localStorage
function loadNotes() {
  var saved = localStorage.getItem(STORAGE_KEY);
  if (saved === null) {
    return;
  }
  try {
    var parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      notes = parsed;
    }
  } catch (error) {
    notes = [];
  }
}

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
  saveNotes();
  renderNotes();
}

// Draw the notes that match the search box
function renderNotes() {
  notesList.innerHTML = "";

  var term = searchInput.value.trim().toLowerCase();

  var visibleNotes = notes.filter(function (note) {
    return note.text.toLowerCase().indexOf(term) !== -1;
  });

  if (visibleNotes.length === 0 && term !== "") {
    var empty = document.createElement("li");
    empty.className = "no-results";
    empty.textContent = "No notes match your search.";
    notesList.appendChild(empty);
  }

  visibleNotes.forEach(function (note) {
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
  saveNotes();
  renderNotes();

  noteInput.value = "";
  noteInput.focus();
});

// Search as the user types
searchInput.addEventListener("input", renderNotes);

// On page load: get the saved notes and draw them
loadNotes();
renderNotes();