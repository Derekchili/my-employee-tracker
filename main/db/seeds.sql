USE company_db;

INSERT INTO department (name) VALUES 
('Operations'),
('Yardwaste'),
('Recycle'),
('Mechanic');

INSERT INTO role (title, salary, department_id) VALUES 
('Plant Manager', '150000', 1),
('Yardwaste Manager', '110000', 2),
('Refuse Driver', '90000', 3),
('Diesel Mechanic', '85000', 4); 

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Jeff', 'Smith', 1, 1),
('Mike', 'Miller', 2, 2),
('Graham', 'Jones', 3, NULL),
('Derek', 'Jeter', 4, NULL);     