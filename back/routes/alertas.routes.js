module.exports = app => {
    const alertas = require("../controllers/alertas.controller.js");
  
    var router = require("express").Router();
  
    // Devuelve todas las alertas
    router.get("/", alertas.findAll);

    // Recuperar la ultima alerta por id
    router.get("/:id", alertas.findLastOne);

    // Borrar alerta por id
    router.delete("/:id", alertas.delete);

    app.use('/api/alertas', router);
};