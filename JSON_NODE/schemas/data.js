const Ajv2020 = require("ajv/dist/2020");

const ajv = new Ajv2020();

const schema = require("./videojuego.schema.json");

ajv.addSchema(schema, "videojuego");

module.exports = ajv;