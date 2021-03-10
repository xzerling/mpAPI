module.exports = (sequelize, Sequelize) => {
    const sensorRegistrado = sequelize.define("sensorRegistrado", {
      sr_id: {
        type: Sequelize.INTEGER
      },
      //corresponde a uno de los ids de los sensores que envian informacion
      nombre: {
        type: Sequelize.STRING
      },
      cultivo: {
        type: Sequelize.STRING
      },
      ubicacion:{
        type: Sequelize.STRING
      },
      valorMaximo:{
        type: Sequelize.DOUBLE
      },
      valorMinimo:{
        type: Sequelize.DOUBLE
      },
    });
  
    return sensorRegistrado;
  };