#Bamazon Storefront

### Synopsis
***

An interactive shopping node app where MySQL and Node.JS are used to allow :  
* Users as a customer can view, track and make a purchase. 
* Users as a manager can view, track and update the product inventory.

##### Customer Portal (customer.js)
***

In Customer Portal, users can view all sale items and will be promted to enter the item id# that users want to purchase and how many items users wish to purchase. 
If the item in stock user will be prompted the total purchase that been made, if the item out of stock users will be prompted that the item quantity Insufficient.

![](https://i.imgur.com/jJmSrKn.gif)

##### Manager Portal (manager.js)
***

In Manager Portal users will be prompted to choose from the following options:
* View products for sale - Manager can view all sale items.
* View low inventory - Manager only can view items that have quantity lower than 5.
* Add to inventory - Manager can add more stock on the chosen item ID#.
* Add a new product - Manager can add new product to the table.

###### View products for sale & low inventory
***

![](https://i.imgur.com/fO5M1Fp.gif)

###### Add to inventory & new product
***

![](https://i.imgur.com/lLt9qJn.gif)

#### Contributors:
***

Andre Gunawan [GitHub](https://github.com/andregunawan)

#### Technologies Used:
***

* Javascript
* nodeJS
* MySQL
* npm packages:
	- [mysql](https://github.com/felixge/node-mysql)
	- [inquirer](https://github.com/SBoudrias/Inquirer)
	- [cli-table](https://github.com/Automattic/cli-table)

