module.exports = (sequelize, Sequelize) => {
    const Alertas = sequelize.define("alertas", {
      idAlertas: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      tipo: {
        type: Sequelize.STRING
      },
      sensorID: {
        type: Sequelize.STRING
      },
      ubicacion: {
        type: Sequelize.STRING
      },
      cultivo: {
        type: Sequelize.STRING
      },
      lote:{
        type: Sequelize.STRING
      },
      valor:{
        type: Sequelize.DOUBLE
      },
      mensaje:{
        type: Sequelize.STRING
      },
      timeStamp:{
        type: Sequelize.DATE
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      // define the table's name
      tableName: 'alertas'
      

    });
  
    return Alertas;
  };