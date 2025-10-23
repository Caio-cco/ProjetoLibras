import mysql from 'mysql2/promise';

export const conection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tcc',
});