const mysql = require('mysql');
const inquirer = require('inquirer');
const Table = require('cli-table');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'Bamazon', 
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  home();
});

function home() {
	 inquirer.prompt([

    {
		type: "list",
		message: "What would you want to do?",
		name: "action",
		choices: [
		"View Products for Sale", 
		"View Low Inventory",
		"Add to Inventory",
		"Add New Product"
		]
    }

	]).then(function(options) {
  		if(options.action === "View Products for Sale")
  		{
  			showSale();
  		}
  		else if(options.action === "View Low Inventory")
  		{
  			lowInv();
  		}
  		else if(options.action === "Add to Inventory")
  		{
  			addQty();
  		}
  		else if(options.action === "Add New Product")
  		{
  			newProd();
  		}
	});
}

function showSale() {
	connection.query("SELECT * FROM products", function(err, result) {

		var table = new Table({
			head: ['Item Id#', 'Product Name', 'Departement Name', 'Price', 'Stock Qty'],
		});


		for(var i = 0; i < result.length; i++){
			table.push(
				[result[i].item_id, result[i].product_name, result[i].department_name, "$" + result[i].price, result[i].stock_quantity]
			);
		};
		console.log(table.toString());

		if (err) throw err;

		inquirer.prompt([

		{
			type: "list",
			message: "Back to Main Menu?",
			name: "action",
			choices: ["Yes", "No"]
		}

		]).then(function(options) {
			if(options.action === "Yes")
			{
				home();
			}
			else
			{
				showSale();
			}
		});
  	});
};

function lowInv() {
	connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, result) {

		var table = new Table({
			head: ['Item Id#', 'Product Name', 'Departement Name', 'Price', 'Stock Qty'],
		});


		for(var i = 0; i < result.length; i++){
			table.push(
				[result[i].item_id, result[i].product_name, result[i].department_name, "$" + result[i].price, result[i].stock_quantity]
			);
		};
		console.log(table.toString());

		if (err) throw err;

		inquirer.prompt([

		{
			type: "list",
			message: "Back to Main Menu?",
			name: "action",
			choices: ["Yes", "No"]
		}

		]).then(function(options) {
			if(options.action === "Yes")
			{
				home();
			}
			else
			{
				lowInv();
			}
		});
  	});
};

function addQty(id_number, qty) {
	inquirer.prompt([

    {
      name: "id_number",
      message: "Which Item ID you would like to UPDATE?",
    },
    {
      name: "qty",
      message: "How many?",
    },

	]).then(function(products) {
		var total = 0;

		connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", [id_number], 
		function(err, result) {
			connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?", [products.qty, products.id_number], 
			function(err, result) {
			console.log(products.id_number + " qty UPDATED!");
			});
			showSale();
		});
	});
};

function newProd(item_id, product_name, department_name, price, stock_quantity) {
	inquirer.prompt([

    {
      name: "id_number",
      message: "Enter the new item ID!",
    },
    {
      name: "prodName",
      message: "Enter the new product name!",
    },
    {
      name: "deptName",
      message: "Which department this new product belongs to?",
    },
    {
      name: "prodPrice",
      message: "Please enter the price!",
    },
    {
      name: "qty",
      message: "Please enter the new stock quantity!",
    },

	]).then(function(products) {

		connection.query("INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?, ?);", [products.id_number, products.prodName, products.deptName, products.prodPrice, products.qty], 
		function(err, result) {
			if (err) throw err;
			showSale();
			console.log("New Product Added!!")
			menu();
		});

		// connection.query(
		// "INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (" + 
		// products.id_number + "," +
		// products.prodName + "," +
		// products.deptName + "," +
		// products.prodPrice + "," +
		// products.qty
		// });


	});
};

function menu() {
	inquirer.prompt([

    {
		type: "list",
		message: "Back to Main Menu?",
		name: "action",
		choices: ["Yes", "No"]
    }

  ]).then(function(options) {
  		if(options.action === "Yes")
  		{
  			home();
  		}
  		else
  		{
  			console.log("Thank you for coming, see you!");
  			connection.end();
  		}
  });	
};




