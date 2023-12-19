const mysql = require("mysql2/promise");
// const config = require("../config");

function createPool() {
    try {
      const mysql = require('mysql2');
  
      const pool = mysql.createPool({
        // host: "sql7.freesqldatabase.com",
        // user: "sql7633443",
        // password: "n6HlKDbant",
        // database: "sql7633443",
        host: "localhost",
        user: "root",
        password: "",
        database: "exam",
        connectionLimit: 10,
        waitForConnections: true,
        queueLimit: 0
      });
  
      const promisePool = pool.promise();
  
      return promisePool;
    } catch (error) {
      return console.log(`Could not connect - ${error}`);
    }
  }
  
  const pool = createPool();
  
  module.exports = {
    connection: async () => pool.getConnection(),
    execute: (...params) => pool.execute(...params)
  };
