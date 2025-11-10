const db = require('../../database/client');


const InglesToSpanish = async (englishWord) => {
  try {
    const [rows] = await db.query('SELECT spanish FROM words WHERE english = ?', [englishWord]);
    if (rows.length > 0) {
      return rows[0].spanish;
    } else {
      return null; // Palabra no encontrada
    }
  } catch (error) {
    console.error('Error al traducir:', error);
    throw error;
  }
};

const EspanolToIngles = async (spanishWord) => {
  try {
    const [rows] = await db.query('SELECT english FROM words WHERE spanish = ?', [spanishWord]);
    if (rows.length > 0) {
      return rows[0].english;
    } else {
      return null; // Palabra no encontrada
    }
  } catch (error) {
    console.error('Error al traducir:', error);
    throw error;
  }
};

module.exports = { InglesToSpanish, EspanolToIngles };