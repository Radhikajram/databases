const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todo',
});

//db connection
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('connect to mysql');
});

//get todo list.

app.get('/gettodo', (req, res) => {
  let sql = 'SELECT * FROM todo';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//create todo table.

app.get('/createtodotable', (req, res) => {
  let sql =
    'CREATE TABLE todo(id int AUTO_INCREMENT,description VARCHAR(255),done VARCHAR(10),PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Create table todo !!');
  });
});

// Add Todo item.
app.post('/addtodo', (req, res) => {
  let sql = 'INSERT INTO todo set ?';
  let addRecord = { description: req.body.description, done: req.body.done };
  db.query(sql, addRecord, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Record successfully inserted');
  });
});

// update Todo item.
app.put('/updatetodo/:id', (req, res) => {
  let sql = `UPDATE  todo set ? WHERE id = ${req.params.id}`;
  let updateRecord = { description: req.body.description, done: req.body.done };
  db.query(sql, updateRecord, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Record successfully updated');
  });
});

// Delete Todo item.
app.delete('/deletetodo/:id', (req, res) => {
  let sql = `delete from  todo WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Record successfully deleted');
  });
});

app.listen('3000', () => {
  console.log('Server stared on port 3000');
});
