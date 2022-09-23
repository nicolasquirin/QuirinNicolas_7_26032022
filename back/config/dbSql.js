// Importation de MySql
const mysql = require("mysql");

//Connection a la base de données MySql
const mysqlconnection = mysql.createConnection({
  host: "mysql-quirinnicolas.alwaysdata.net",
  database: "quirinnicolas_mynetwork",
  user: "281180",
  password: "Torma281180",
});
mysqlconnection.connect((err) => {
  if (err) {
    console.log(`error connecting: ${err}`);
  } else {
    console.log("Connected to Mysql DB");
  }
});

module.exports = mysqlconnection;
