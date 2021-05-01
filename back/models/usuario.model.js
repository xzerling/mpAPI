module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
      idusuario: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      roles_id:{
        type: Sequelize.INTEGER
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      // define the table's name
      tableName: 'usuario'
      

    });
  
    return Usuario;
  };