const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let db = new sqlite3.Database(':memory:', (err) => {
    if (err) return console.error(err.message);
    console.log('Connected to the in-memory SQlite database.');
});

db.run("CREATE TABLE numbers (id INTEGER PRIMARY KEY, value INT)");
db.run("CREATE TABLE series (id_ INTEGER PRIMARY KEY,id INTEGER, power INT, power_value REAL, FOREIGN KEY(id) REFERENCES numbers(id))");

  
  app.post('/api/number', (req, res) => {
    const number = req.body.number;
    const series = [];

    for (let i = 1; i <= 10; i++) {
        series.push({ power: i, power_value: Math.pow(number, i) });
    }

    db.serialize(() => {
        db.run(`INSERT INTO numbers(value) VALUES(?)`, [number], function(err) {
            if (err) return console.log(err.message);

            const insertedId = this.lastID;

            series.forEach(item => {
                db.run(`INSERT INTO series(id, power, power_value) VALUES(?, ?, ?)`, [insertedId, item.power, item.power_value], function(err) {
                    if (err) console.log(err.message);
                });
            });

            res.json({ series });
        });

        db.all("SELECT * FROM numbers", [], (err, rows) => {
            if (err) {
                throw err;
            }
            console.log("\nNumbers Table");
            rows.forEach((row) => {
                console.log(row);
            });
        });
    
        db.all("SELECT * FROM series", [], (err, rows) => {
            if (err) {
                throw err;
            }
            console.log("\nSeries Table");
            rows.forEach((row) => {
                console.log(row);
            });
        });
    });

    

});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
