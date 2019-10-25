var mysql = require("mysql");
var inquirer = require("inquirer");
let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "bamazon_db",
  user: "root",
  password: "loveofcode"
});

connection.connect(function(err) {
  console.log("connected as id " + connection.threadId);

  seeProducts();
});
function seeProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.table(
        res[i].id +
          " | " +
          res[i].product_name +
          " | " +
          res[i].department_name +
          " | " +
          res[i].price +
          " | " +
          res[i].stock_quantity
      );
    }
    console.log("-----------------------------------");
    start();
  });
}

function start() {
  inquirer
    .prompt([
      {
        name: "ID",
        type: "number",
        message: "What would you like to [BUY] today?"
      },
      {
        name: "quantity",
        type: "number",
        message: "How many would you like to buy?"
      }
    ])
    .then(function(answer) {
      connection.query("SELECT * FROM products", function(errors, items) {
        let position = answer.ID - 1;
        if (items[position].stock_quantity >= answer.quantity) {
          connection.query(
            "UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?",
            [answer.quantity, answer.ID],
            function(error, res) {
              if (error) throw error;
              console.log(res);
            }
          );
        } else {
          console.log("Not enough in stock!");
        }
      });
      // based on their answer, either call the bid or the post functions
    });
}
