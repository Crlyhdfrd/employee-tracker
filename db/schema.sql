DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department (
  id INTERGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR (30) NOT NULL
);

CREATE TABLE role (
  id INTERGER PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR([30] NOT NULL,
  salary DECIMAL NOT NULL,
  departmaent_id INTERGER,
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department FORIEGN KEY (department_id) REFRENCES department (id) ON DELETE SET NULL)
);

CREATA TABLE employee (
  id INTERGER PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFRENCES role(id) ON DELETE SET NULL,
  manager_id INTERGER,
  INDEX manager_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFRENCES employee(id) ON DELETE SET NULL
);