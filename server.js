const express = require('express');
const bodyParser = require('body-parser')

const app=express();
const port=3000;

app.use(bodyParser.json());
app.use(express.static('public'));

let notes=[];

app.get('/api/notes',(req,res)=>{
  res.json(notes);
});

app.post('/api/notes',(req,res)=>{
  const { text, time } = req.body;
  const myNote = {id: Date.now(), text, time, pinned: false};
  notes.push(myNote);
  res.json(myNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  notes = notes.filter(note => note.id !== noteId);
  res.json({ success: true, message: 'Note deleted successfully', notes });
});

app.put('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const { text, time, pinned } = req.body;

  const noteIndex = notes.findIndex(note => note.id === noteId);
  if (noteIndex === -1) {
    return res.status(404).json({ success: false, message: 'Note not found' });
  }

  if (text !== undefined) notes[noteIndex].text = text;
  if (time !== undefined) notes[noteIndex].time = time;
  if (pinned !== undefined) notes[noteIndex].pinned = pinned;
  res.json({ success: true, message: 'Note updated successfully', note: notes[noteIndex] });
});

app.listen(port,()=>{
  console.log(`Server is running on port:${port}`);
});
