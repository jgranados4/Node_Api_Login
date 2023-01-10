const MysqlConnection = require("../util/database");
const Bcrypt = require("bcryptjs");
const controller = {};
// GET all
controller.list = (req, res) => {
  console.log("Listado");
  MysqlConnection.query("SELECT * FROM login", (err, rows, fields) => {
    if (!err) {
      res.json({
        status_code: 202,
        message: "Listado",
        usuario: rows,
        //authData
      });
      console.log(rows);
    } else {
      res.json({
        code: 500,
        error: true,
        message: err,
      });
    }
  });
};

// GET An
controller.get = (req, res) => {
  const { id } = req.params;
  MysqlConnection.query(
    "SELECT * FROM login WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
        res.json({
          code: 500,
          error: true,
          message: err,
        });
      }
    }
  );
};
//INSERT
controller.save = async (req, res, next) => {
  let { username, password } = req.body;
  let passwordHash = await Bcrypt.hash(password, 8);
  console.log(username, password, passwordHash);
  const query = `INSERT INTO login(username,password)
VALUES(?,?)`;
  MysqlConnection.query(
    query,
    [username, (password = passwordHash)],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          error: false,
          message: " Saved",
        });
      } else {
        res.json({
          error: true,
          message: err,
        });
        console.log(err);
      }
    }
  );
};
//!Ingresar peso
controller.saveP = (req, res) => {
  const { peso } = req.body;
  console.log(peso);
  const query = `INSERT INTO peso(peso)
VALUES(?)`;
  MysqlConnection.query(query, [peso], (err, rows, fields) => {
    if (!err) {
      res.json({
        error: false,
        message: " Saved",
      });
    } else {
      res.json({
        error: true,
        message: err,
      });
      console.log(err);
    }
  });
};
//Autenticacion
controller.auth = async (req, res, next) => {
  let { username, password } = req.body;
  let passwordHash = await Bcrypt.hash(password, 8);
  if (username && password) {
    MysqlConnection.query(
      `SELECT * FROM login WHERE username=?`,
      [username],
      async (error, results) => {
        if (
          results.length == 0 ||
          !(await Bcrypt.compare(password, results[0].password))
        ) {
          res.json({
            error: true,
            message: error,
          });
        } else {
          res.json({
            error: false,
            message: "Login correcto",
          });
        }
      }
    );
  }
  console.log(username, password, passwordHash);
};
module.exports = controller;
