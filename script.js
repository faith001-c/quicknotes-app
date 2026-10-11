// Select elements
var noteForm = document.getElementById("note-form");
var noteInput = document.getElementById("note-input");
var categorySelect = document.getElementById("category-select");
var notesList = document.getElementById("notes-list");

// All notes live in this array
var notes = [];

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
    deleteBtn.setAttribute("data-id", note.id);

    meta.appendChild(label);
    meta.appendChild(date);
    meta.appendChild(deleteBtn);

    li.appendChild(text);
    li.appendChild(meta);
    notesList.appendChild(li);
  });
}

// Add a note when the form is submitted
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var text = noteInput.value.trim();
  if (text === "") {
    return;
  }

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