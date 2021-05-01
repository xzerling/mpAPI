const db = require("../models");
const Medicion = db.medicion;
const Op = db.Sequelize.Op;

//Crea y gurada una nueva medicion del sensor(solo usar con HW)
exports.create = (req, res) => {
    // Validate request
    if (!req.body.idSensor) {
        res.status(400).send({
        message: "El contenido no puede estar vacio!"
        });
        return;
    }
    
    // Create a Medicion
    const medicion = {
        idSensor: req.body.idSensor,
        fecha: req.body.fecha,
        hora: req.body.hora,
        valor: req.body.valor
    };
    
    // Save Medicion in the database
    Medicion.create(medicion)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Ocurrió algun error creando la Medicion."
        });
        });
};

// Devuelve todas las mediciones.
exports.findAll = (req, res) => {

    const medicion = req.query.idSensor;
    var condition = medicion ? { medicion: { [Op.like]: `%${medicion}%` } } : null;

    Medicion.findAll({ where: condition })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Ocurrió un error recuperando todas las mediciones."
        });
        });
};

// Devuelve todas las mediciones de un id especifico 
exports.findOne = (req, res) => {
  
};

// Devuelve la ultima medicion de un id especifico 
exports.findLastOne = async (req, res) => {
    const id = req.params.id;

    medicion = await db.sequelize.query(
        'SELECT * FROM medicion WHERE idSensor = :id ORDER BY idMedicion DESC LIMIT 1', 
        {
            model: Medicion,
            replacements: {id: id},
            mapToModel: true // pass true here if you have any mapped fields
        });

        res.send(medicion);

        
    //console.log(medicion);

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
