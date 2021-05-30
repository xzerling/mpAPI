module.exports = (sequelize, Sequelize) => {
    const sensorMedicion = sequelize.define("sensorMedicion", {
      sr_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      //corresponde a uno de los ids de los sensores que envian informacion
      m_id: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      cultivo: {
        type: Sequelize.STRING
      },
      ubicacion:{
        type: Sequelize.STRING
      },
      lote:{
        type: Sequelize.STRING
      },
      valorMaximo:{
        type: Sequelize.DOUBLE
      },
      valorMinimo:{
        type: Sequelize.DOUBLE
      },
      valor:{
        type: Sequelize.DOUBLE
      },
      fecha:{
        type: Sequelize.DATEONLY
      },
      hora:{
        type: Sequelize.DATE(6)
      },
      idMedicion:{
        type: Sequelize.INTEGER
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      // define the table's name
      tableName: 'sensorMedicion'
    });
  
    return sensorMedicion;
  };