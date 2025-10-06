async function loadNotes() {
      const res = await fetch('/api/notes');
      const notes = await res.json();
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
          <button class="delete-btn" onclick="deleteNote(${n.id})">🗑️</button>
        `;
        list.appendChild(li);
      });
}

async function deleteNote(id) {
  await fetch(`/api/notes/${id}`, { method: 'DELETE' });
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