import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "<username>",
  password: "<password>",
  database: "girudo",
});
