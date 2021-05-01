//const { default: sensorRegistrado } = require("../../front/src/pages/sensorRegistrado");

const db = require("../models");
const SensorRegistrado = db.sensorRegistrado;
const SensorMedicion = db.sensorMedicion;
const Op = db.Sequelize.Op;
const seq = db.sequelize;
const { QueryTypes } = require('sequelize');
const sensorMedicionModel = require("../models/sensorMedicion.model");
var d3 = require("d3");

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
        m_id: req.body.m_id,
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
exports.findAll = async (req, res) => {

    const sensorRegistrado = req.query.idSensor;
    var condition = sensorRegistrado ? { sensorRegistrado: { [Op.like]: `%${sensorRegistrado}%` } } : null;

    await SensorRegistrado.findAll({ where: condition })
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


exports.getAllSensoresWithLastMed = async (req, res) => {
    seq.query("SELECT `sensorRegistrado`.`sr_id`, "+
    "`sensorRegistrado`.`m_id`, "+
    "`sensorRegistrado`.`nombre`, "+
    "`sensorRegistrado`.`cultivo`, "+
    "`sensorRegistrado`.`ubicacion`, "+
    "`sensorRegistrado`.`valorMaximo`, "+
    "`sensorRegistrado`.`valorMinimo`, "+
    "t3.valor, t3.fecha, t3.hora, t3.idMedicion "+
    "FROM sensorRegistrado, (SELECT t1.* FROM medicion as t1 "+
    "JOIN (SELECT idSensor, max(idMedicion) idMedicion, hora, valor FROM medicion group by idSensor) as t2 "+
    "ON t1.idMedicion = t2.idMedicion AND t1.idSensor = t2.idSensor) as t3 "+
    "WHERE t3.idSensor = sensorRegistrado.m_id "+
    "order by sr_id", {type: QueryTypes.SELECT})
    .then (result =>{
        return res.status(201).send({
            result
        });
    })
    .catch(err => {
        res.status(500).send({
          message: "Error"
        });
    });
}

exports.getOneSensorWithLastMed = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    seq.query("SELECT `sensorRegistrado`.`sr_id`, "+
    "`sensorRegistrado`.`m_id`, "+
    "`sensorRegistrado`.`nombre`, "+
    "`sensorRegistrado`.`cultivo`, "+
    "`sensorRegistrado`.`ubicacion`, "+
    "`sensorRegistrado`.`valorMaximo`, "+
    "`sensorRegistrado`.`valorMinimo`, "+
    "t3.valor, t3.fecha, t3.hora, t3.idMedicion "+
    "FROM sensorRegistrado, (SELECT t1.* FROM medicion as t1 "+
    "JOIN (SELECT idSensor, max(idMedicion) idMedicion, hora, valor FROM medicion group by idSensor) as t2 "+
    "ON t1.idMedicion = t2.idMedicion AND t1.idSensor = t2.idSensor) as t3 "+
    "WHERE sensorRegistrado.m_id = "+`"${id}" `+
    "AND t3.idSensor = sensorRegistrado.m_id "+
    "order by sr_id",
    {type: QueryTypes.SELECT}, {bind: { status: 'active' }},
    {model: SensorMedicion, mapToModel: true, distinct:true })
    .then (result =>{
        return res.status(201).send({
            result
        });
    })
    .catch(err => {
        res.status(500).send({
          message: "Error"
        });
    });
} 

exports.getResNave = async (req, res) => {
    const nave = req.params.nave;
    console.log(nave);
    seq.query("SELECT "+
        "`sensorRegistrado`.`cultivo`, "+
        "`sensorRegistrado`.`ubicacion`, "+
        "`sensorRegistrado`.`valorMaximo`, "+
        "`sensorRegistrado`.`valorMinimo`, "+
       "AVG(t3.valor) as promedio "+
    "FROM sensorRegistrado, (SELECT t1.* FROM medicion as t1 "+
    "JOIN (SELECT idSensor, max(idMedicion) idMedicion, hora, valor FROM medicion group by idSensor) as t2 "+
    "ON t1.idMedicion = t2.idMedicion AND t1.idSensor = t2.idSensor) as t3 "+
    "WHERE t3.idSensor = sensorRegistrado.m_id "+
    "AND ubicacion = "+ `"${nave}" `+
    "group by ubicacion",
    {type: QueryTypes.SELECT}, {bind: { status: 'active' }},
    {model: SensorMedicion, mapToModel: true, distinct:true })
    .then (result =>{
        return res.status(201).send({
            result
        });
    })
    .catch(err => {
        res.status(500).send({
          message: "Error"
        });
      });
}

exports.getAnMat = async (req, res) => {

    const nave = req.params.nave;
    console.log(nave);
    seq.query("SELECT "+
    "`sensorRegistrado`.`sr_id`, "+
	"`sensorRegistrado`.`m_id`, "+
        "`sensorRegistrado`.`cultivo`, "+
        "`sensorRegistrado`.`ubicacion`, "+
        "`sensorRegistrado`.`valorMaximo`, "+
        "`sensorRegistrado`.`valorMinimo`, "+
       "t3.valor "+
    "FROM sensorRegistrado, (SELECT t1.* FROM medicion as t1 "+
    "JOIN (SELECT idSensor, max(idMedicion) idMedicion, hora, valor FROM medicion group by idSensor) as t2 "+
    "ON t1.idMedicion = t2.idMedicion AND t1.idSensor = t2.idSensor) as t3 "+
    "WHERE t3.idSensor = sensorRegistrado.m_id "+
    "AND ubicacion = "+ `"${nave}" `,
    {type: seq.QueryTypes.SELECT}, {bind: { status: 'active' }})
    .then (result =>{

        var valores = [];
        for(i = 0; i < result.length; i++)
        {
            //console.log(result[i].valor)
            valores[i] = result[i].valor
        }
        console.log(valores);
        var max = d3.max(valores);
        var min = d3.min(valores);
        var promedio = d3.mean(valores);
        var mediana = d3.median(valores);
        var varianza = d3.variance(valores);
        var desvEst = d3.deviation(valores);
        var anMat = 
            {
                min: min,
                max: max,
                promedio: promedio,
                mediana: mediana,
                varianza: varianza,
                desvEst: desvEst
            }
        var json = JSON.stringify(anMat);
        console.log(anMat);
        console.log("min: "+min, "\n", "max: "+max,"\n", "devEst: ", desvEst+"\n", "varianza: "+varianza, "\n", "mediana: "+mediana, "\n", "promedio: "+promedio);
        return res.status(201).send({
            anMat
        });
    })
    .catch(err => {
        res.status(500).send({
          message: "Error"
        });
      });
} 

exports.getAllAnMat = async (req, res) => {

    function analisis(valores) {
     
        var max = d3.max(valores);
        var min = d3.min(valores);
        var promedio = d3.mean(valores);
        var mediana = d3.median(valores);
        var varianza = d3.variance(valores);
        var desvEst = d3.deviation(valores);
        var anMat = 
            {
                min: min,
                max: max,
                promedio: promedio,
                mediana: mediana,
                varianza: varianza,
                desvEst: desvEst
            }
        return anMat;
     } 

    const nave = req.params.nave;
    console.log(nave);
    seq.query("SELECT "+
        "`sensorRegistrado`.`sr_id`, "+
        "`sensorRegistrado`.`m_id`, "+
        "`sensorRegistrado`.`cultivo`, "+
        "`sensorRegistrado`.`ubicacion`, "+
        "`sensorRegistrado`.`valorMaximo`, "+
        "`sensorRegistrado`.`valorMinimo`, "+
       "t3.valor "+
    "FROM sensorRegistrado, (SELECT t1.* FROM medicion as t1 "+
    "JOIN (SELECT idSensor, max(idMedicion) idMedicion, hora, valor FROM medicion group by idSensor) as t2 "+
    "ON t1.idMedicion = t2.idMedicion AND t1.idSensor = t2.idSensor) as t3 "+
    "WHERE t3.idSensor = sensorRegistrado.m_id "+
    "order by ubicacion",
    {type: seq.QueryTypes.SELECT})
    .then (result =>{

        //console.log(result);
        var nave1 = [];
        var nave2 = [];
        var nave3 = [];

        for(i = 0; i < result.length; i++)
        {
            if(result[i].ubicacion == "nave 1")
            {
                nave1[i] = result[i].valor
            }
            else if(result[i].ubicacion == "nave 2")
            {
                nave2[i] = result[i].valor
            }
            else if(result[i].ubicacion == "nave 3")
            {
                nave3[i] = result[i].valor
            }           
        }

        var nave2 = nave2.filter(function (el) {return el != null;});
        var nave3 = nave3.filter(function (el) {return el != null;});

        var n1 = analisis(nave1);
        var n2 = analisis(nave2);
        var n3 = analisis(nave3);
        
        return res.status(201).send({
            n1, n2, n3
        });
    })
    .catch(err => {
        res.status(500).send({
          message: "Error"
        });
      });
} 


// Devuelve todas las mediciones de un id especifico 
exports.findOne = (req, res) => {
  
};


// Actualiza un sensor registrado por id especifico
exports.update = (req, res) => {

    const id = req.params.id;
    
    SensorRegistrado.update(req.body, {
        where: { sr_id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Sensor Registrado was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update Sensor Registrado with id=${id}. Maybe Sensor Registrado was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Sensor Registrado with id=" + id
            });
        });

};

// Borra uun sensor registrado con su id especifico
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Usuario.destroy({
      where: { sr_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Sensor Registrado was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Sensor Registrado with id=${id}. Maybe Sensor Registrado was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Sensor Registrado with id=" + id
        });
      });
  };


