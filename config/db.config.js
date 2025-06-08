module.exports = {
  HOST: process.env.DB_HOST,      // l'adresse de ta DB Railway, pas localhost
  USER: process.env.DB_USER,      // utilisateur DB Railway (ex: root)
  PASSWORD: process.env.DB_PASSWORD, // mot de passe DB Railway
  DB: process.env.DB_NAME,         // nom de ta base Railway
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
