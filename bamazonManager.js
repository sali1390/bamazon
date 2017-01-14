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
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
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
        }
	})
}

function viewProducts(){
    connection.query('SELECT item_id, product_name, price FROM products', function(err, res) {
        if (err) throw err;
        
        for (i=0; i<res.length; i++){
            console.log(res[i].item_id + ": " + res[i].product_name + " - " + res[i].price);
            console.log("---------------------------------------------");
        }
    });
    
    console.log("Hello : View Products for Sale");
}

function viewLowInventory(){
    console.log("Hello : View Low Inventory");
}

function addToInventory(){
    console.log("Hello : Add to Inventory");
}

function addNewProduct(){
    console.log("Hello : Add New Product");
}

menuOptions();