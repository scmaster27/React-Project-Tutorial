const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

connection.connect();

app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM CUSTOMER",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});
        // {
        //     "id": 1,
        //     "image": "https://placeimg.com/64/64/1",
        //     "name": "김철수",
        //     "birthday": "961222",
        //     "gender": "남자",
        //     "job": "대학생",
        //   },
        //   {
        //     "id": 2,
        //     "image": "https://placeimg.com/64/64/2",
        //     "name": "홍길동",
        //     "birthday": "960305",
        //     "gender": "남자",
        //     "job": "프로그래머",
        //   },
        //   {
        //     "id": 3,
        //     "image": "https://placeimg.com/64/64/3",
        //     "name": "이순신",
        //     "birthday": "921205",
        //     "gender": "남자",
        //     "job": "디자이너"
        //   }

app.listen(port, () => console.log(`Listening on port ${port}`));
