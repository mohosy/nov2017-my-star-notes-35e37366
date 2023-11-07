var sky = document.getElementById('sky');
var noteBox = document.getElementById('note');
var saveBtn = document.getElementById('save');
var removeBtn = document.getElementById('remove');
var whichStar = document.getElementById('which-star');
var message = document.getElementById('message');
var savedList = document.getElementById('saved-list');

var current = null;
var storageKey = 'my-star-notes';
var notes = {};

try {
  var raw = localStorage.getItem(storageKey);
  if (raw) notes = JSON.parse(raw);
} catch (e) {
  notes = {};
}

for (var i = 1; i <= 40; i++) {
  var btn = document.createElement('button');
  btn.className = 'star';
  btn.type = 'button';
  btn.dataset.id = 'star-' + i;
  btn.title = 'star-' + i;

  btn.onclick = function () {
    current = this.dataset.id;
    whichStar.textContent = 'Editing ' + current;
    noteBox.value = notes[current] || '';
    message.textContent = '';
    paintStars();
  };

  sky.appendChild(btn);
}

saveBtn.onclick = function () {
  if (!current) {
    message.textContent = 'pick a star first';
    return;
  }

  var text = noteBox.value.trim();
  if (!text) {
    message.textContent = 'write something first';
    return;
  }

  notes[current] = text;
  localStorage.setItem(storageKey, JSON.stringify(notes));
  message.textContent = 'saved ' + current;
  paintStars();
  drawList();
};

removeBtn.onclick = function () {
  if (!current) {
    message.textContent = 'pick a star first';
    return;
  }

  delete notes[current];
  localStorage.setItem(storageKey, JSON.stringify(notes));
  noteBox.value = '';
  message.textContent = 'removed note on ' + current;
  paintStars();
  drawList();
};

function paintStars() {
  var stars = document.querySelectorAll('.star');
  for (var i = 0; i < stars.length; i++) {
    var s = stars[i];
    var id = s.dataset.id;
    s.classList.remove('active');
    s.classList.remove('has-note');

    if (id === current) s.classList.add('active');
    if (notes[id]) s.classList.add('has-note');
  }
}

function drawList() {
  savedList.innerHTML = '';

  var keys = Object.keys(notes).sort();
  if (keys.length === 0) {
    var li = document.createElement('li');
    li.textContent = 'no notes yet';
    savedList.appendChild(li);
    return;
  }

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var li = document.createElement('li');
    li.textContent = key + ': ' + notes[key];
    savedList.appendChild(li);
  }
}

paintStars();
drawList();
