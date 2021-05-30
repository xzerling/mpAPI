module.exports = (sequelize, Sequelize) => {
    const sensorRegistrado = sequelize.define("sensorRegistrado", {
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
    },
    {
      timestamps: false,
      freezeTableName: true,
      // define the table's name
      tableName: 'sensorRegistrado'
    });
  
    return sensorRegistrado;
  };