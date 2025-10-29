import mysql from "mysql2/promise";

const conection = await mysql.createConnection({
  host: "falar-e-magico.cry2muqqwntr.sa-east-1.rds.amazonaws.com",
  user: "Caio",
  password: "06171825csm",
  database: "tcc",
  multipleStatements: true 
});



export { conection };