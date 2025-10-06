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
  const myNote = {id: Date.now(), text, time };
  notes.push(myNote);
  res.json(myNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  notes = notes.filter(note => note.id !== noteId);
  res.json({ success: true, message: 'Note deleted successfully', notes });
});

app.listen(port,()=>{
  console.log(`Server is running on port:${port}`);
});
