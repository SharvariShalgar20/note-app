let allNotes = [];

async function loadNotes() {
      const res = await fetch('/api/notes');
      allNotes = await res.json();
      displayNotes(allNotes);
}

function displayNotes(notes) {
  const list = document.getElementById('notes');
  list.innerHTML = '';
  notes.forEach(n => {
    const li = document.createElement('li');
    li.classList.add('note-item');
    li.innerHTML = `
      <div>
        <strong>${n.text}</strong><br>
        <small>Added on: ${n.time}</small>
      </div>
      <div class="btn-group">
        <button class="edit-btn" onclick="editNote(${n.id}, '${escapeQuotes(n.text)}')">✏️</button>
        <button class="delete-btn" onclick="deleteNote(${n.id})">🗑️</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function filterNotes() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filtered = allNotes.filter(note => 
    note.text.toLowerCase().includes(query)
  );
  displayNotes(filtered);
}


function escapeQuotes(text) {
  return text.replace(/'/g, "\\'");
}

async function deleteNote(id) {
  await fetch(`/api/notes/${id}`, { method: 'DELETE' });
  loadNotes();
}

function editNote(id, oldText) {
  const list = document.getElementById('notes');
  const li = Array.from(list.children).find(li => 
    li.innerHTML.includes(`deleteNote(${id})`)
  );
  if (!li) return;

  li.innerHTML = `
    <input type="text" id="editText-${id}" value="${oldText}" class="edit-input">
    <button class="btn save-btn" onclick="saveEdit(${id})">💾</button>
    <button class="btn cancel-btn" onclick="loadNotes()">❌</button>
  `;
}

async function saveEdit(id) {
  const newText = document.getElementById(`editText-${id}`).value.trim();
  if (!newText) return alert('Note text cannot be empty!');
  const newTime = new Date().toLocaleString();

  await fetch(`/api/notes/${id}`, {
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ text: newText, time: newTime })
  });

  loadNotes();
}

document.getElementById('noteForm').addEventListener('submit', async e => {
      e.preventDefault();
      const text = document.getElementById('noteText').value.trim();
      if (!text) return alert('Please enter a note before submitting!');
      const time = new Date().toLocaleString();
      await fetch('/api/notes', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({text,time})
      });
      document.getElementById('noteText').value = '';
      loadNotes();
});

// Load notes when the page loads
loadNotes();