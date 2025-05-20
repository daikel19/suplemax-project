import mysql from 'mysql2/promise';

let connection = null;

export async function getConnection() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'suplemax_db',
    });
  }
  return connection;
}