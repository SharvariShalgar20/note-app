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
  const myNote={
    date:Date.now(),
    text:req.body.text
  }
  notes.push(myNote);
  res.json(myNote);
});

app.listen(port,()=>{
  console.log(`Server is running on port:${port}`);
});
