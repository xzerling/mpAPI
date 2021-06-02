const db = require("../models");
const Alertas = db.Alertas;
const Op = db.Sequelize.Op;


// Devuelve todas las alertas.
exports.findAll = (req, res) => {

    //const alertas = req.query.idAlerta;
    //var condition = alertas ? { alertas: { [Op.like]: `%${alertas}%` } } : null;

    Alertas.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Ocurrió un error recuperando todas las alertas."
        });
        });
};

// Devuelve todas las mediciones de un id especifico 
exports.findOne = (req, res) => {
  
};

// Devuelve la ultima medicion de un id especifico 
exports.findLastOne = async (req, res) => {
    const id = req.params.id;

    alerta = await db.sequelize.query(
        'SELECT * FROM alertas WHERE sensorID = :id ORDER BY idAlertas DESC LIMIT 1', 
        {
            model: Alertas,
            replacements: {id: id},
            mapToModel: true // pass true here if you have any mapped fields
        });

        res.send(alerta);

        
    //console.log(medicion);

  };


// Borra una alerta asociada a un sensor con su id especifico

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id);
    Alertas.destroy({
      where: { idAlertas: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Alerta Eliminada!"
          });
        } else {
          res.send({
            message: `No se pudo elminar la alerta con id=${id}.!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error 500 can not delete alerta with id=" + id
        });
      });
  };
