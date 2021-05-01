module.exports = app => {
    const sensorRegistrado = require("../controllers/sensorRegistrado.controller.js");
  
    var router = require("express").Router();
  
    // Registrar un nuevo sensor
    router.post("/", sensorRegistrado.create);
  
    // Recuperar todos los sensores registrados
    router.get("/", sensorRegistrado.findAll);

    router.get("/senmed", sensorRegistrado.getAllSensoresWithLastMed);

    router.get("/res/:nave", sensorRegistrado.getResNave);

    router.get("/senmed/:id", sensorRegistrado.getOneSensorWithLastMed);

    router.put("/:id", sensorRegistrado.update);

    router.get("/anmat/:nave", sensorRegistrado.getAnMat);

    router.get("/anmat/", sensorRegistrado.getAllAnMat);

    app.use('/api/sensores', router);
};