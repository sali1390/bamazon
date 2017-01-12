var mysql = require('mysql');
var inquirer = require('inquirer')
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "", //Your password
    database: "bamazon"
})

function displayProducts() {
    connection.query('SELECT item_id, product_name, price FROM products', function(err, res) {
        if (err) throw err;
        
        for (i=0; i<res.length; i++){
            console.log(res[i].item_id + ": " + res[i].product_name + " - " + res[i].price);
            console.log("---------------------------------------------");
        }
    })
}

displayProducts();