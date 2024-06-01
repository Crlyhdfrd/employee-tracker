// Import and require mysql2
const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "Kenni2016",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

function start() {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Add a Manager",
        "Update an employee role",
        "View Employees by Manager",
        "Delete Employee",
        "View the total utilized budget of a department",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View all departments":
          viewAllFromTable("department");
          break;
        case "View all roles":
          viewAllFromTable("role");
          break;
        case "View all employees":
          viewAllFromTable("employee");
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employees Manager":
          updateEmployeeManager();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "View Employees by Manager":
          viewEmployeesByManager();
          break;
        case "View Employees by Department":
          viewEmployeesByDepartment();
          break;
        case "Delete Employee":
          deleteEmployee();
          break;
        case "View the total utilized budget of a department":
          viewUtilizedBudgetOfDepartment();
          break;
        case "Exit":
          connection.end();
          console.log("Goodbye!");
          break;
      }
    });
}

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "name",
      message: "Enter the name of the new department:",
    })
    .then((answer) => {
      
      addToTable("department", "name", "'" + answer.name + "'");
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the title of the new role:",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary of the new role:",
      },
      {
        type: "input",
        name: "department_id",
        message: "Enter the department id of the new role:",
      },
    ])
    .then((answer) => {
      addToTable("role", "title, salary, department_id", "'" + answer.title + "', " + answer.salary + ", " + answer.department_id);
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter the first name of the new employee:",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter the last name of the new employee:",
      },
      {
        type: "input",
        name: "role_id",
        message: "Enter the role id of the new employee:",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Enter the manager id of the new employee:",
        default: "NULL"
      },
    ])
    .then((answer) => {
      addToTable("employee", "first_name, last_name, role_id, manager_id", "'" + answer.first_name + "', '" + answer.last_name + "', " + answer.role_id + ", " + answer.manager_id);
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employee_id",
        message: "Enter the id of the employee you would like to update:",
      },
      {
        type: "input",
        name: "role_id",
        message: "Enter the new role id of the employee:",
      },
    ])
    .then((answer) => {
      updateAnEmployee(answer.employee_id, "role_id", answer.role_id);
    });
}

function updateEmployeeManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employee_id",
        message: "Enter the id of the employee you would like to update:",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Enter the new manager id of the employee:",
      },
    ])
    .then((answer) => {
      updateAnEmployee(answer.employee_id, "manager_id", answer.manager_id);
    });
}

function deleteEmployee() {
  inquirer
    .prompt({
      type: "input",
      name: "employee_id",
      message: "Enter the id of the employee you would like to delete:",
    })
    .then((answer) => {
      deleteEmployeeById(answer.employee_id);
    });
}



function viewEmployeesByManager() {
  inquirer
    .prompt({
      type: "input",
      name: "manager_id",
      message: "Enter the id of the manager you would like to view employees for:",
    })
    .then((answer) => {
      viewEmployeesOfManager(answer.manager_id);
    });
}

function viewUtilizedBudgetOfDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "department_id",
      message: "Enter the id of the department you would like to view the utilized budget for:",
    })
    .then((answer) => {
      utilizedBudgetOfDepartment(answer.department_id);
    });
}

function deleteEmployeeById(employeeId) {
  db.query("DELETE FROM employee WHERE id = " + employeeId, function (err, results) {
    console.log("Deleted employee " + employeeId);
    start();

  });
  
}
      
function viewAllFromTable(tableName) {
  db.query("SELECT * FROM " + tableName, function (err, results) {
    formatResults(results, tableName);
      start();
  });
}

function addToTable(tableName, titles, values) {
  db.query("INSERT INTO " + tableName + " (" + titles + ") VALUES (" + values + ")", function (err, results) {
  console.log("Added to " + tableName);
    start();
  });

}

function updateAnEmployee(employeeId, column, value) {
  db.query("UPDATE employee SET " + column + " = " + value + " WHERE id = " + employeeId, function (err, results) {
  console.log("Updated employee " + employeeId);
    start();
  });
}

function viewEmployeesOfManager(manager_id) {
  db.query("SELECT * FROM employee WHERE manager_id = " + manager_id, function (err, results) {
    formatResults(results, "employee");
    start();
  });

}


function utilizedBudgetOfDepartment(department_id) {
  db.query("SELECT r.department_id, SUM(r.salary) AS total_salary FROM employee e JOIN role r ON e.role_id = r.id WHERE r.department_id = " + department_id + " GROUP BY r.department_id", function (err, results) {
    
    console.log("Total budget of department: " + results[0].total_salary);
    start();
  });
}



// updateAnEmployee(2, "role_id", 2);
// addToTable("role", "title, salary, department_id", "'Sales', 100000, 1");

// viewAllFromTable("employee");

function formatResults(results, tableName) {
  console.log("\n");
  console.table(results);
  console.log("\n");
}

start();
