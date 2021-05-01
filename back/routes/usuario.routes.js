module.exports = app => {
    const usuario = require("../controllers/usuario.controller.js");
  
    var router = require("express").Router();
  
    // Create a new usuario
    router.post("/", usuario.create);
  
    // Retrieve all usuarios
    router.get("/", usuario.findAll);

    // Update a usuario
    router.put("/:id", usuario.update);

    // Delete a usuario
    router.delete("/:id", usuario.delete);

    app.use('/api/usuario', router);
};