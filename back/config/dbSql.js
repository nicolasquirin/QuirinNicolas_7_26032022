// Variable d'environnement
const dotenv = require("dotenv");
dotenv.config();

// Importation de MySql
const mysql = require("mysql");
console.log(mysql);

//Connection a la base de données MySql
const mysqlconnection = mysql.createConnection({
  hoste: "localhost",
  database: "mynetwork",
  user: "root",
  password: "",
});
mysqlconnection.connect((err) => {
  if (err) {
    console.log(`error connecting: ${err}`);
  } else {
    console.log("Connected to Mysql DB");
  }
});

module.exports = mysqlconnection;