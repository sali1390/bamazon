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
        
        askQuestion1();
    })
}

function askQuestion1(){
	inquirer.prompt({
		type: 'input',
        name: 'item_id',
        message: 'Please enter the id of the product you would like to buy:'
	}).then(function(answers){
        connection.query('SELECT * FROM products WHERE ?',{
			item_id: answers.item_id
		}, function(err, res, fields) {
            if (err) throw err;
//            console.log(res[0].product_name);
            askQuestion2(res[0].item_id, res[0].product_name);
        })
//		connection.end();       
	})
}

function askQuestion2(id, productName){
    inquirer.prompt({
		type: 'input',
        name: 'quantity_requested',
        message: 'Please enter how many you would like:'
	}).then(function(answers){
        connection.query('SELECT * FROM products WHERE ?',{
			item_id: id
		}, function(err, res, fields) {
            if (err) throw err;
            
            var qRequested = answers.quantity_requested;
            
//            console.log(qRequested);
            
            checkInventory(qRequested, productName);
        })
        
	})
}

function checkInventory(qReq, item){
    connection.query('SELECT stock_quantity FROM products WHERE ?',{
        product_name: item
    }, function(err, res) {
//        console.log(res[0].stock_quantity);
        
        if (qReq < res[0].stock_quantity){
            connection.query('UPDATE products SET ? WHERE ?',[{
                stock_quantity: res[0].stock_quantity-qReq
            },{product_name: item
              }], function(err, res, fields) {
            if (err) throw err;
//                console.log(res);
                
            totalCost(item, qReq);
            })
        } else {
            console.log("Insufficient quantity!");
            
            connection.end();
        }
        
//        console.log("It works");
    });
}

function totalCost(item, qReq){
    connection.query('SELECT price FROM products WHERE ?',{
        product_name: item
    }, function(err, res) {
        var total = res[0].price * qReq;
        
        console.log("Your total today is: $" + total.toFixed(2));
    });
    
    connection.end();
}

displayProducts();












