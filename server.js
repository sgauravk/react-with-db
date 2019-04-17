const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.CURRENT_DB
});

const app = new express();

const addNewUser = function(req, res) {
  connection.connect(() => {
    const name = req.body.name;
    console.log(name);
    connection.query(
      "select count(name) as count from usersDetails where name = ?",
      name,
      (err, results, fields) => {
        console.log(results);
        if (results[0].count === 0) {
          connection.query(
            "insert into usersDetails values(?,?)",
            [name, 0],
            (err, results, fields) => {}
          );
        }
        connection.query(
          "select balance from usersDetails where name = ?",
          name,
          (err, results, fields) => {
            res.send(JSON.stringify(results[0].balance));
          }
        );
      }
    );
  });
};

const updateWallet = function(req, res) {
  connection.connect(() => {
    const { totalBalance, username } = req.body;
    connection.query(
      "update usersDetails set balance = ?  where name = ?",
      [totalBalance, username],
      (err, results, fields) => {
        res.end();
      }
    );
  });
};

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("react-app/build"));

app.post("/addUser", addNewUser);
app.post("/addMoney", updateWallet);
app.listen(port, () => console.log("listening on " + port));
