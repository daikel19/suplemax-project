import mysql from 'mysql2/promise';

export const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Cambia si tienes contraseña
  database: 'suplemax_db',
});
