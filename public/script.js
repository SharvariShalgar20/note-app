async function loadNotes() {
      const res = await fetch('/api/notes');
      const notes = await res.json();
      const list = document.getElementById('notes');
      list.innerHTML = '';
      notes.forEach(n => {
        const li = document.createElement('li');
        li.textContent = n.text;
        list.appendChild(li);
      });
}

document.getElementById('noteForm').addEventListener('submit', async e => {
      e.preventDefault();
      const text = document.getElementById('noteText').value;
      await fetch('/api/notes', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({text})
      });
      document.getElementById('noteText').value = '';
      loadNotes();
});