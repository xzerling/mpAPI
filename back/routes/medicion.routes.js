module.exports = app => {
    const medicion = require("../controllers/medicion.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", medicion.create);
  
    // Retrieve all Tutorials
    router.get("/", medicion.findAll);

    // Recuperar la ultima medicion por id
    router.get("/:id", medicion.findLastOne);

    app.use('/api/medicion', router);
};