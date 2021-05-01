const db = require("../models");
const Usuario = db.usuario;
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
    const usuario = {
        idusuario: req.body.idusuario,
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,
        roles_id: req.body.roles_id
    };
    
    // Save Medicion in the database
    Usuario.create(usuario)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Ocurrió algun error creando el usuario."
        });
        });
};

// Devuelve todas las mediciones.
exports.findAll = (req, res) => {

    const usuario = req.query.idusuario;
    var condition = usuario ? { usuario: { [Op.like]: `%${usuario}%` } } : null;

    Usuario.findAll({ where: condition })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Ocurrió un error recuperando todos los usuarios."
        });
        });
};

// Devuelve todas los usuarios de un id especifico 
exports.findOne = (req, res) => {
  
};


// Actualiza una medicion por id especifico(solo para pruebas)
exports.update = (req, res) => {

    const id = req.params.id;
    
    Usuario.update(req.body, {
        where: { idusuario: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Usuario was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update Usuario with id=${id}. Maybe Usuario was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Usuario with id=" + id
            });
        });

};

// Borra uun usuario con su id especifico
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Usuario.destroy({
      where: { idusuario: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Usuario was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Usuario with id=${id}. Maybe Usuario was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Usuario with id=" + id
        });
      });
  };

// Delete all Medicions from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Medicions
exports.findAllPublished = (req, res) => {
  
};
