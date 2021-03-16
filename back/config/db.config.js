module.exports = {
    HOST:'162.214.124.120',
    USER:'wwbiov_masterp',
    PASSWORD:'mpSensores0903',
    DB: 'wwbiov_MPS',
    dialect: "mysql",
    pool: {
      max: 999,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
