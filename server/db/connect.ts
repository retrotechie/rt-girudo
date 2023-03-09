import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "mysqluser",
  password: "<password>",
  database: "girudo",
});
