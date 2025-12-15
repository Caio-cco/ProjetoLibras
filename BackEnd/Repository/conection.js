import mysql from "mysql2/promise";


const usarAWS = true; 

const conection = await mysql.createConnection({
  host: usarAWS
    ? "falaremagico.c54e0wcomrec.us-east-2.rds.amazonaws.com"
    : "localhost",

  user: usarAWS
    ? "Caio"
    : "root",

  password: usarAWS
    ? "csm06171825"
    : "1234",

  database: "tcc",
  port: 3306,
  multipleStatements: true
});

export { conection };