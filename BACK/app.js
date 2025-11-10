const express = require('express');
const cors = require('cors');
const app = express();
const traducirRouter = require('./src/routes/traducir.router');

const port = 3000;

// Habilitar CORS para permitir peticiones desde el navegador
app.use(cors());
app.use(express.json());
app.use('/api', traducirRouter);


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});