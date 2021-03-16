module.exports = app => {
    const sensorRegistrado = require("../controllers/sensorRegistrado.controller.js");
  
    var router = require("express").Router();
  
    // Registrar un nuevo sensor
    router.post("/", sensorRegistrado.create);
  
    // Recuperar todos los sensores registrados
    router.get("/", sensorRegistrado.findAll);

    app.use('/api/sensores', router);
};