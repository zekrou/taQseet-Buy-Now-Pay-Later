module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "BNPL",
  dialect: "mysql",
  port: 3306,  // Ajoute cette ligne avec le bon port
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
