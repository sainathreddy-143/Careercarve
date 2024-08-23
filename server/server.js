// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite database
const db = new sqlite3.Database('database.db');

// Get all mentors
app.get('/mentors', (req, res) => {
    db.all('SELECT * FROM mentors', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Create a booking
app.post('/bookings', (req, res) => {
    const { student_id, mentor_id, start_time, end_time, duration } = req.body;
    db.run('INSERT INTO bookings (student_id, mentor_id, start_time, end_time, duration) VALUES (?, ?, ?, ?, ?)',
        [student_id, mentor_id, start_time, end_time, duration],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID });
        });
});

// Get bookings
app.get('/bookings', (req, res) => {
    db.all('SELECT * FROM bookings', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
