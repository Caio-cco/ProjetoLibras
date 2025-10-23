import mysql from 'mysql2/promise';

export const conection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'tcc',
});