INSERT INTO department (name)
VALUES
("IT"),
("Finance & Accounting"),
("Sales & Marketing"),
("Operations");

INSERT INTO role (title, salary, department_id)
VALUES
("Full Stack Developer", 80000, 1),
("Software Engineer", 120000, 1),
("Accountant", 10000, 2),
("Financial Analyst", 70000, 3),
("Sales Lead", 90000, 3),
("projectManager", 100000, 4),
("operations Manager", 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("James", "Masterson", 2, null),
("Johnathan", "Gray",1,1),
("Matthew", "Henry", 4, null),
("Ryan", "Moore", 3, 3),
("Felcia", "Miller",6,null),
("Katy", "Sims", 5, 5),
("Angela", "Lovell", 7, 5),
("Ken", "Ryan", 7, null),
("Jackie", "Seigns", 8, 7);

