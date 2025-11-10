const express = require('express');
const app = express();
const traducirRouter = require('./src/routes/traducir.router');

const port = 3000;


app.use(express.json());
app.use('/api', traducirRouter);


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});