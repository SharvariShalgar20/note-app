async function loadNotes() {
      const res = await fetch('/api/notes');
      const notes = await res.json();
      const list = document.getElementById('notes');
      list.innerHTML = '';
      notes.forEach(n => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${n.text}</strong><br><small>Added on: ${n.time}</small>`;
        list.appendChild(li);
      });
}

document.getElementById('noteForm').addEventListener('submit', async e => {
      e.preventDefault();
      const text = document.getElementById('noteText').value;
      const time = new Date().toLocaleString();
      await fetch('/api/notes', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({text,time})
      });
      document.getElementById('noteText').value = '';
      loadNotes();
});