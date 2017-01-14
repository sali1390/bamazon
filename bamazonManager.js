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
        choices: ['View Products for Sale', 'View Low Inventory', 'Restock Inventory', 'Add New Product', 'Exit']
	}).then(function(answers){
        switch(answers.menu_select){
            case 'View Products for Sale':
                viewProducts();
            break;
            case 'View Low Inventory':
                viewLowInventory();
            break;
            case 'Restock Inventory':
                restockInventory();
            break;
            case 'Add New Product':
                addNewProduct();
            break;
            case 'Exit':
                exit();
            break;
        }
	})
};

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
};

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

function restockInventory(){
    connection.query('SELECT product_name, item_id FROM products', function(err, res) {
        inquirer.prompt({
            type: 'list',
            name: 'menu_select',
            message: 'Which Item would you like to restock?:',
            choices: getArrayColumn(res, 'product_name', 'item_id')
        }).then(function(answers) {
            var item_id = answers.menu_select;
            inquirer.prompt({
                type: 'input',
                name: 'how_many',
                message: 'How many?:',
            }).then(function(answers) {
                updateInventory(answers.how_many, item_id);
            })
        })
    })
};

function addNewProduct(){
    inquirer.prompt({
        type: 'input',
        name: 'new_product_name',
        message: 'What item would you like to add?:',
    }).then(function(answers) {
        var product_name = answers.new_product_name;
        inquirer.prompt({
            type: 'input',
            name: 'department_name',
            message: 'Which department?:',
        }).then(function(answers) {
            var department_name = answers.department_name;
            inquirer.prompt({
                type: 'input',
                name: 'price',
                message: 'How much for this item?:',
            }).then(function(answers) {
                var price = answers.price;
                inquirer.prompt({
                    type: 'input',
                    name: 'quantity',
                    message: 'How many of this item?:',
                }).then(function(answers) {
                    var stock_quantity = answers.quantity;
                    
                    connection.query("INSERT INTO products SET ?", {
                        product_name: product_name,
                        department_name: department_name,
                        price: price,
                        stock_quantity: stock_quantity
                    }, function(err, res) {});
                    
                    console.log("Item Added!");
                    
                    menuOptions();
                })
            })
        })
    })  
};

function exit(){
    connection.end();
};

function getArrayColumn(arr, keyName, keyId){
    var column = [];
    for (i=0; i< arr.length; i++){
        var obj = {name: arr[i][keyName], value: arr[i][keyId]}
        column.push(obj);
    }
    return(column);
};

function updateInventory(quantity, id){
    connection.query('UPDATE products SET stock_quantity=stock_quantity+? WHERE ?',[
         quantity,{item_id: id
      }], function(err, res, fields) {
    if (err) throw err;
        console.log("Item updated!");
        
        menuOptions();
    })
};

menuOptions();