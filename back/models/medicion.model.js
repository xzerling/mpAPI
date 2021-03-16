module.exports = (sequelize, Sequelize) => {
    const Medicion = sequelize.define("medicion", {
      idMedicion: {
        type: Sequelize.INTEGER,
        primaryKey: true
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
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      // define the table's name
      tableName: 'medicion'
      

    });
  
    return Medicion;
  };