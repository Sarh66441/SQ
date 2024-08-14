const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database(':memory:');

// Create table
db.serialize(() => {
  db.run("CREATE TABLE button_clicks (id INTEGER PRIMARY KEY, button TEXT)");
});

// Middleware
app.use(bodyParser.json());

// Route to store the clicked button
app.post('/store', (req, res) => {
  const button = req.body.button;
  db.run("INSERT INTO button_clicks (button) VALUES (?)", button, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

// Route to get the last clicked button
app.get('/last', (req, res) => {
  db.get("SELECT button FROM button_clicks ORDER BY id DESC LIMIT 1", (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ button: row ? row.button : null });
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
