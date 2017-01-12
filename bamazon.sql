CREATE SCHEMA `bamazon` ;

CREATE TABLE `bamazon`.`products` (
  `item_id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(255) NOT NULL,
  `department_name` VARCHAR(255) NOT NULL,
  `price` DECIMAL(6,2) NOT NULL,
  `stock_quantity` INT NOT NULL,
  PRIMARY KEY (`item_id`));
  
INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Cabana Beach Umbrella', 'Patio', '32.99', '10');
INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Chunky Heels', 'Shoes', '20.93', '10');
INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Bic Pens', 'Office Supplies', '5.99', '30');
INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Notepad', 'Office Supplies', '1.99', '50');
INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Calendar', 'Office Supplies', '6.99', '25');
INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Laptop', 'Electronics', '899.99', '5');
INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Flowers', 'Grocery', '15.99', '10');
INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Water', 'Grocery', '5.99', '10');
INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Vacuum', 'Home', '64.99', '12');
INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Shampoo', 'Personal Care', '4.99', '15');
