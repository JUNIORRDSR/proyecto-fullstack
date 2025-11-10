const {InglesToSpanish, EspanolToIngles} = require('../services/traducir.services');

const traducir = async (req, res) => {
  const { word, direction } = req.query;
    try {
        let translation;
        if (direction === 'en-es') {
            translation = await InglesToSpanish(word);
        } else if (direction === 'es-en') {
            translation = await EspanolToIngles(word);
        }
        if (translation) {
            res.json({ translatedWord: translation });
        } else {
            res.status(404).json({ message: 'Palabra no encontrada en el diccionario' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { traducir };