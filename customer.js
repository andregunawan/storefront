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
  showTable();
});

function showTable() {
	connection.query("SELECT * FROM products", function(err, result) {

		var table = new Table({
			head: ['Item Id#', 'Product Name', 'Departement Name', 'Price', 'Stock Qty'],
		});

		//loops through each item in the mysql database and pushes that information into a new row in the table
		for(var i = 0; i < result.length; i++){
			table.push(
				[result[i].item_id, result[i].product_name, result[i].department_name, "$" + result[i].price, result[i].stock_quantity]
			);
		};
		console.log(table.toString());

		if (err) throw err;

    	  inquirer.prompt([

		    {
		      name: "id_number",
		      message: "Which Item ID you would like to buy?",
		    },
		    {
		      name: "qty",
		      message: "How many?",
		    },

		  ]).then(function(products) {

		    updateQty(products.id_number, products.qty);

		  });
  	});
};

function updateQty(id_number, qty) {
	var total = 0;
	var itemPrice = 0;
	connection.query("SELECT stock_quantity, price FROM products WHERE item_id = ?", [id_number], 
		function(err, result) {
		total = result[0].stock_quantity;
		itemPrice = result[0].price;
		totalPurchase = qty * itemPrice;
		if(qty > total) {
			console.log("Insufficient quantity!");
			// showTable();
			menu();
		} else {
			connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [qty, id_number], 
			function(err, result) {
			console.log("Thank you!");
			console.log("Your total purchase: $" + totalPurchase);
			// showTable();
			menu();
			});
		}
	});
};

function menu() {
	inquirer.prompt([

    {
		type: "list",
		message: "Continue Shopping?",
		name: "action",
		choices: ["Yes", "No"]
    }

  ]).then(function(options) {
  		if(options.action === "Yes")
  		{
  			showTable();
  		}
  		else
  		{
  			console.log("Thank you for coming, see you!");
  			connection.end();
  		}
  });	
};




