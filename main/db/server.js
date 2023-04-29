const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

const mysql = require('mysql2');
const db = mysql.createConnection(
    {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'company_db'
    },
    console.log('connected to db')
);

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/department", async (req, res) => {
    try {
      const conn = await db.promise();
      const [rows, fields] = await conn.execute("SELECT * FROM department");
      res.json(rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "oh no!", err: err });
    }
  });
  

  app.get("/api/role", async (req, res) => {
    try {
      const rows = await db.promise().query("SELECT * FROM role");
      res.json(rows[0]);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "oh no!", err: err });
    }
  });
  

  app.get("/api/employee", async (req, res) => {
    try {
      const conn = await db.promise();
      const [rows] = await conn.query("SELECT * FROM employee");
      res.json(rows);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "oh no!", err: err });
    }
  });
  
  app.post("/api/department", async (req, res) => {
    try {
      const { department_name } = req.body;
      const conn = await db.promise();
      const [result] = await conn.execute("INSERT INTO department (department_name) VALUES (?)", [department_name]);
      res.json({ id: result.insertId });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "oh no!", err: err });
    }
  });

  app.post("/api/role", async (req, res) => {
    try {
      const { title, salary, department_id } = req.body;
      const conn = await db.promise();
      const [result] = await conn.execute("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [title, salary, department_id]);
      res.json({ id: result.insertId });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "oh no!", err: err });
    }
  });

  app.post("/api/employee", async (req, res) => {
    try {
      const { first_name, last_name, role_id, manager_id } = req.body;
      const conn = await db.promise();
      const [result] = await conn.execute("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [first_name, last_name, role_id, manager_id]);
      res.json({ id: result.insertId });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "oh no!", err: err });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}!`);
  });


