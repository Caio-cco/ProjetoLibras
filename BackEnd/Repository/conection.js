import mysql from "mysql2/promise";

// const conection = await mysql.createConnection({
//   host: "falar-e-magico.cry2muqqwntr.sa-east-1.rds.amazonaws.com", //port 3306
//   user: "Caio",
//   password: "06171825csm", //store in vault
//   database: "tcc",
//   multipleStatements: true 
// });

const conection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "5526",
  database: "tcc",
  multipleStatements: true 
});

export { conection };