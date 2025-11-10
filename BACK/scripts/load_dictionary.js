const fs = require('fs');
const path = require('path');
const db = require('../database/client');

async function loadDictionaryToDatabase() {
  try {
    // Leer el archivo JSON
    const jsonPath = path.join(__dirname, '../dictionary.json');
    const jsonData = fs.readFileSync(jsonPath, 'utf-8');
    const words = JSON.parse(jsonData);

    console.log(`📚 Cargando ${words.length} palabras a la base de datos...`);

    // Limpiar la tabla antes de insertar (opcional)
    await db.query('TRUNCATE TABLE words');
    console.log('✓ Tabla limpiada');

    // Preparar datos para inserción masiva
    const values = words.map(word => [word.english, word.spanish]);

    // Inserción masiva
    const query = 'INSERT INTO words (english, spanish) VALUES ?';
    const [result] = await db.query(query, [values]);

    console.log(`✓ ${result.affectedRows} palabras insertadas exitosamente`);

    // Verificar cantidad de registros
    const [rows] = await db.query('SELECT COUNT(*) as total FROM words');
    console.log(`✓ Total de palabras en la base de datos: ${rows[0].total}`);

    // Mostrar algunas palabras de ejemplo
    const [samples] = await db.query('SELECT id, english, spanish FROM words LIMIT 5');
    console.log('\n📝 Primeras 5 palabras:');
    samples.forEach(word => {
      console.log(`  ID: ${word.id}, English: ${word.english}, Spanish: ${word.spanish}`);
    });

    process.exit(0);

  } catch (error) {
    console.error('✗ Error durante la carga:', error.message);
    process.exit(1);
  }
}

// Ejecutar la función
loadDictionaryToDatabase();
