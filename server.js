require('dotenv').config(); // ✅ Charge les variables d'environnement depuis .env

const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const db = require("./models");
const cron = require('node-cron');
const path = require('path');

const app = express();

// Configuration CORS
const corsOptions = {
  origin: '*', // ou spécifie 'http://localhost:53383' pour plus de sécurité
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

// Middleware CORS
app.use(cors(corsOptions));

// Support JSON & Form URL Encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Session
app.use(
  cookieSession({
    name: "zack-session",
    keys: ["COOKIE_SECRET"], // secret à mettre en variable d'env en prod
    httpOnly: true,
  })
);

// Serve static files with CORS
app.use('/uploads', cors(corsOptions), express.static(path.join(__dirname, 'uploads')));
app.use('/brand', cors(corsOptions), express.static(path.join(__dirname, 'brand')));
app.use('/product', cors(corsOptions), express.static(path.join(__dirname, 'product')));

// Synchroniser la DB sans suppression
db.sequelize.sync({ alter: true }).then(() => {
  console.log('Database synchronized without dropping data');
}).catch((err) => {
  console.error('Unable to synchronize the database:', err);
});

// Routes
require('./routes/brandNotifications.routes')(app);
require('./routes/category.routes')(app);
require('./routes/notification.routes')(app);
require('./routes/blackList.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/client.routes')(app);
require('./routes/paymentMeth.routes')(app);
require('./routes/paymentPlan.routes')(app);
require('./routes/order.routes')(app);
require('./routes/product.routes')(app);
require('./routes/brand.routes')(app);
require('./routes/firstpp.routes')(app);
require('./routes/secondpp.routes')(app);
require('./routes/thirdpp.routes')(app);
require('./routes/fourthpp.routes')(app);

// Route de test
app.get("/", (req, res) => {
  res.json({ message: "Welcome to BNPL application." });
});

// Lancer le serveur
const port = 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
