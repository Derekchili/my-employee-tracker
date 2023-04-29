const cTable = require('console.table');
const inquirer = require('inquirer');
const server = require('./server');
const fs = require('fs');
const mysql = require('mysql2/promise');



async function askQuestion() {
     try {
    const db = await mysql.createConnection(
      {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'company_db'
      }
    );
    console.log('connected to db');
  
    
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'mainQuestion',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role'
        ]
      },
      {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?',
        when: (answers) => answers.mainQuestion === 'Add a department'
      },
      {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the role?',
        when: (answers) => answers.mainQuestion === 'Add a role'
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary of the role?',
        when: (answers) => answers.mainQuestion === 'Add a role'
      },
      {
        type: 'input',
        name: 'roleDepartment',
        message: 'Which department does the role belong to?',
        when: (answers) => answers.mainQuestion === 'Add a role'
      },
      {
        type: 'input',
        name: 'employeeFirstName',
        message: 'What is the employee\'s first name?',
        when: (answers) => answers.mainQuestion === 'Add an employee'
      },
      {
        type: 'input',
        name: 'employeeLastName',
        message: 'What is the employee\'s last name?',
        when: (answers) => answers.mainQuestion === 'Add an employee'
      },
      {
        type: 'input',
        name: 'employeeRole',
        message: 'What is the employee\'s role?',
        when: (answers) => answers.mainQuestion === 'Add an employee'
      },
      {
        type: 'input',
        name: 'employeeManager',
        message: 'Who is the employee\'s manager?',
        when: (answers) => answers.mainQuestion === 'Add an employee'
      }
    ]);
    switch (answers.mainQuestion) {
        case 'View all departments':
          const [deptRows, departmentFields] = await db.query('SELECT * FROM department');
          console.table(deptRows);
          break;
        case 'View all roles':
          const [roleRows, roleFields] = await db.query('SELECT * FROM role');
          console.table(roleRows);
          break;
        case 'View all employees':
          const [empRows, empFields] = await db.query('SELECT * FROM employee');
          console.table(empRows);
          break;
        case 'Add a department':
          await db.query(`INSERT INTO department (name) VALUES (?)`, [answers.departmentName]);
          console.log('Department added!');
          break;
        case 'Add a role':
          const [deptRowsForRole, _] = await db.execute('SELECT * FROM department');
          const deptNames = deptRowsForRole.map(row => row.name);
          const { roleDepartment } = answers;
          if (!deptNames.includes(roleDepartment)) {
            console.log('Invalid department name!');
            return;
          }
          await db.execute(`
            INSERT INTO role (title, salary, department_id) 
            VALUES (?, ?, (SELECT id FROM department WHERE name = ?))
          `, [answers.roleName, answers.roleSalary, answers.roleDepartment]);
          console.log('Role added!');
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  askQuestion();
















