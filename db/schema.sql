DROP DATABASE IF EXISTS employer
;
CREATE DATABASE employer
;

USE employer
;

CREATE TABLE department(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE employee_role(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
title VARCHAR(30) NOT NULL,
salary INT NOT NULL,
department_id INT AUTO_INCREMENT NOT NULL --holds reference to department role belongs to
);
CREATE TABLE employee(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT NOT NULL --holds reference to another employee that is the manager of current employee (null if employee has no manager)
);