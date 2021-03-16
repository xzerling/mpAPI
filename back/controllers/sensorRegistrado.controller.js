const db = require("../models");
const SensorRegistrado = db.sensorRegistrado;
const Op = db.Sequelize.Op;

//Crea y gurada una nueva medicion del sensor(solo usar con HW)
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nombre) {
        res.status(400).send({
        message: "El contenido no puede estar vacio!"
        });
        return;
    }
    
    // Create a Medicion
    const sensorRegistrado = {
        nombre: req.body.nombre,
        cultivo: req.body.cultivo,
        ubicacion: req.body.ubicacion,
        valorMaximo: req.body.valorMaximo,
        valorMinimo: req.body.valorMinimo
    };
    
    // Save Medicion in the database
    SensorRegistrado.create(sensorRegistrado)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Ocurrió algun error registrando un sensor."
        });
        });
};

// Devuelve todas las mediciones.
exports.findAll = (req, res) => {

    const sensorRegistrado = req.query.idSensor;
    var condition = sensorRegistrado ? { sensorRegistrado: { [Op.like]: `%${sensorRegistrado}%` } } : null;

    SensorRegistrado.findAll({ where: condition })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Ocurrió un error recuperando todos los sensores registrados."
        });
        });
};

// Devuelve todas las mediciones de un id especifico 
exports.findOne = (req, res) => {
  
};

// Actualiza una medicion por id especifico(solo para pruebas)
exports.update = (req, res) => {
  
};

// Borra una medicion con su id especifico
exports.delete = (req, res) => {
  
};

// Delete all Medicions from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Medicions
exports.findAllPublished = (req, res) => {
  
};
