const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
const mysql = require('mysql');




var corsOptions = {
    origin: "http://localhost:3001"
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

  require("./routes/medicion.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`servidor corriendo en puerto: ${PORT}.`);
});

const db = require("./models");
db.sequelize.authenticate()
  .then(() => {
      console.log('Connection has been established successfully.');
  })
  .catch(err => {
      console.error('Unable to connect to the database:', err);
  });