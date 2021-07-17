
/*
Ejemplo de utilizacion:

localhost:3002/api/sensores/+ruta especificada
localhost:3002/api/sensores/senmed
localhost:3002/api/sensores/res/nave 1

 */

module.exports = app => {
    const sensorRegistrado = require("../controllers/sensorRegistrado.controller.js");
  
    var router = require("express").Router();
  
    // Registrar un nuevo sensor
    router.post("/", sensorRegistrado.create);
  
    // Recuperar todos los sensores registrados
    router.get("/", sensorRegistrado.findAll);

    //Todos los sensores con su ultima medicion asociada
    router.get("/senmed", sensorRegistrado.getAllSensoresWithLastMed);

    //Realiza un resumen estadistico de los sensores de una nave
    router.get("/res/:nave", sensorRegistrado.getOneResNave);
    
    //Realiza un resumen estadistico de los sensores de todas las naves
    router.get("/res/", sensorRegistrado.getResNave);

    //Realiza un resumen estadistico de los sensores de todas las naves con sus sensores
    router.get("/resns/", sensorRegistrado.getResNaveSen);

    //Selecciona a un sensor con su ultima medicion por su id
    router.get("/senmed/:id", sensorRegistrado.getOneSensorWithLastMed);

    //Selecciona a un sensor con su ultima medicion por su ubicacion
    router.get("/senmedubi/:nave", sensorRegistrado.getUbiSensorWithLastMed);

    //Actualiza los datos de un sensor registrado
    router.put("/:id", sensorRegistrado.update);

    //Se ejecuta y envia el analisis estadistico de una nave especifica
    router.get("/anmat/:nave", sensorRegistrado.getAnMat);

    //Ejecuta un analisis estadistico para todos los sensosres registrados
    router.get("/anmat/", sensorRegistrado.getAllAnMat);

    // Elimina un sensor
    router.delete("/:id", sensorRegistrado.delete);

    //ruta para poder llamar a la api
    app.use('/api/sensores', router);
};