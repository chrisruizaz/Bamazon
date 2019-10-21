var mysql = require("mysql");
let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "bamazon",
  user: "root",
  password: "loveofcode"
});

connection.connect(err => {
  connection.query("SELECT * FROM bamazon", err, res);
});
