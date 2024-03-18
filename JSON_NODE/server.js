const express = require('express');
const AjvInstance = require('./schemas/data');
const validVideojuego = require('./json/videojuego.json');
const invalidVideojuego = require('./json/videojuego2.json');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
  });

const validarVideojuego = (json, res) => {
  const validate = AjvInstance.getSchema('videojuego');
  const isValid = validate(json);

  // Usamos console.log para registrar en el servidor
  console.log(isValid ? 'JSON válido.' : 'JSON no válido.', validate.errors);

  // Utilizamos res para enviar la respuesta directamente
  if (res) {
    res.status(isValid ? 200 : 400).send(isValid ? 'Válido (ver terminal)' : 'No válido (ver errores terminal)');
  }
};

// Endpoint para validar el schema del body de la request
app.post('/validarVideojuego', (req, res) => {
  validarVideojuego(req.body, res);
});

// Endpoint para probar un JSON válido
app.get('/probarJsonValido', (req, res) => {
  validarVideojuego(validVideojuego, res);
});

// Endpoint para probar un JSON no válido
app.get('/probarJsonInvalido', (req, res) => {
  validarVideojuego(invalidVideojuego, res);
});

// Iniciar el servidor
app.listen(4000, () => console.log('Servidor ejecutándose en http://localhost:4000'));
