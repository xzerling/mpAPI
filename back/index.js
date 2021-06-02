const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
const mysql = require('mysql');




var corsOptions = {
    origin: "http://localhost:3000"
  };
  
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hola mundo." });
});

//carga de las rutas para los llamados a la tabla usuario
require("./routes/usuario.routes")(app);
//carga de las rutas para los llamados a la tabla medicion
require("./routes/medicion.routes")(app);
//carga de las rutas para los llamados a la tabla sensorRegistrado
require("./routes/sensorRegistrado.routes")(app);
//carga de las rutas para los llamados a la tabla alertas
require("./routes/alertas.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`servidor corriendo en puerto: ${PORT}.`);
});

const db = require("./models");
db.sequelize.authenticate()
  .then(() => {
      console.log('Conexion con la base de datos establecida.');
  })
  .catch(err => {
      console.error('Unable to connect to the database:', err);
  });