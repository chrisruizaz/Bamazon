var mysql = require("mysql");
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
  //   start();
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
  });
}

// function start() {
//   inquirer
//     .prompt({
//       name: "postOrBid",
//       type: "list",
//       message: "Would you like to [POST] an auction or [BID] on an auction?",
//       choices: ["POST", "BID", "EXIT"]
//     })
//     .then(function(answer) {
//       // based on their answer, either call the bid or the post functions
//       if (answer.postOrBid === "POST") {
//         postAuction();
//       } else if (answer.postOrBid === "BID") {
//         bidAuction();
//       } else {
//         connection.end();
//       }
//     });
// }
