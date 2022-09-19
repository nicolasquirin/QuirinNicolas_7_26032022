
// Importation de MySql
const mysql = require("mysql");


//Connection a la base de données MySql
const mysqlconnection = mysql.createConnection({
  host: "mysql-serverquirin.alwaysdata.net",
  database: "serverquirin_mysql",
  user: "281478",
  password: "Sextormapilon22",
});
mysqlconnection.connect((err) => {
  if (err) {
    console.log(`error connecting: ${err}`);
  } else {
    console.log("Connected to Mysql DB");
  }
});

module.exports = mysqlconnection;