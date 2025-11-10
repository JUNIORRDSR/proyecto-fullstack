const mysql = require('mysql2');

// Crear pool de conexiones
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dictionary_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exportar versión promise del pool
const promisePool = pool.promise();

// Verificar conexión
promisePool.query('SELECT 1')
  .then(() => {
    console.log('✓ Conexión exitosa a MySQL');
  })
  .catch((err) => {
    console.error('✗ Error al conectar a MySQL:', err.message);
  });

module.exports = promisePool;