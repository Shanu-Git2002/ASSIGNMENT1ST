const express = require('express');
const bodyParser = require('body-parser');
const itemData = require('./itemData');
const path = require('path');
const db = require('./sql');


const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("."));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.post('/api/addItem', (req, res) => {
  console.log(req.body);
  // Retrieve data from the request body
  const item = req.body.selectedItem;
  const shift = req.body.shift;
  const date = req.body.date;
  const engineer = req.body.engineer;
  const dayEngineerCount = req.body.dayEngineerCount;
  const code = req.body.code;
  const unit = req.body.unit;

  // Insert data into the MySQL database
  const sql = 'INSERT INTO item_code_unit (item, shift, date, engineer, dayEngineerCount, code, unit) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [item, shift, date, engineer, dayEngineerCount, code, unit], (err, result) => {
    if (err) {
      // console.error('Error inserting data into MySQL:', err);
      res.status(500).send('Error inserting data into MySQL');
    } else {
      const sql = 'SELECT * FROM item_code_unit';

      db.query(sql, (err, data) => {
        if (err) {
          console.error('Error fetching data:', err);
          res.status(500).json({ error: 'Data Not Present' });
        } else {
          res.render('showlist', { data });
        }
      });
      // console.log('Data inserted successfully');
      // res.status(200).send('Data inserted successfully');
    }
  });
});



app.get('/', (req, res) => {
  res.render('index', { items: itemData });
});


app.get('/getlist', (req, res) => {
  const sql = 'SELECT * FROM item_code_unit';

  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Data Not Present' });
    } else {
      res.render('showlist', { data });
    }
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
