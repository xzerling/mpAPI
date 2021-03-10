module.exports = (sequelize, Sequelize) => {
    const Medicion = sequelize.define("medicion", {
      idMedicion: {
        type: Sequelize.INTEGER
      },
      idSensor: {
        type: Sequelize.STRING
      },
      fecha: {
        type: Sequelize.DATEONLY
      },
      hora: {
        type: Sequelize.DATE(6)
      },
      valor:{
        type: Sequelize.DOUBLE
      }
    });
  
    return Medicion;
  };