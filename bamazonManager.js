var mysql = require('mysql');
var inquirer = require('inquirer')
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "", //Your password
    database: "bamazon"
})

function menuOptions(){
    inquirer.prompt({
		type: 'list',
        name: 'menu_select',
        message: 'Please choose a selection from the following:',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit']
	}).then(function(answers){
        switch(answers.menu_select){
            case 'View Products for Sale':
                viewProducts();
            break;
            case 'View Low Inventory':
                viewLowInventory();
            break;
            case 'Add to Inventory':
                addToInventory();
            break;
            case 'Add New Product':
                addNewProduct();
            break;
            case 'Exit':
                exit();
            break;
        }
	})
}

//Function to view all products available
function viewProducts(){
    connection.query('SELECT item_id, product_name, price FROM products', function(err, res) {
        if (err) throw err;
        
        for (i=0; i<res.length; i++){
            console.log(res[i].item_id + ": " + res[i].product_name + " - " + res[i].price);
            console.log("---------------------------------------------");
        }
        menuOptions();
    });
}

function viewLowInventory(){
    connection.query('SELECT item_id, product_name, price, stock_quantity FROM products', function(err, res) {
        if (err) throw err;
        
        for (i=0; i<res.length; i++){
            if (res[i].stock_quantity < 5){
                console.log(res[i].item_id + ": " + res[i].product_name + " - " + res[i].price);
                console.log("---------------------------------------------");
            }
        }
        menuOptions();
    });
}

function addToInventory(){
    
}

function addNewProduct(){
    console.log("Hello : Add New Product");
}

function exit(){
    connection.end();
}

menuOptions();