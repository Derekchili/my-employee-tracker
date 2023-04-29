USE company_db;

INSERT INTO department (name) VALUES 
('Trash collection'),
('Toter delivery'),
('Recycle collection'),
('Roll off driver');

INSERT INTO role (title, salary, department_id) VALUES 
('Plant Manager', '150000', 1),
('Manager', '110000', 2),
('Lead Driver', '90000', 3),
('Driver', '85000', 4); 

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Jeff', 'Mcmann', 1, 1),
('Mike', 'Munko', 2, 2),
('Graham', 'Herring', 3, NULL),
('Derek', 'Chilson', 4, NULL);     