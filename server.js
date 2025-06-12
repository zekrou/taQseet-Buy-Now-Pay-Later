require('dotenv').config({ path: __dirname + '/.env' });

const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const db = require("./models");
const path = require('path');

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({
  name: "zack-session",
  keys: ["COOKIE_SECRET"],
  httpOnly: true,
}));

// Static folders
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/brand', express.static(path.join(__dirname, 'brand')));
app.use('/product', express.static(path.join(__dirname, 'product')));

// DB Sync
db.sequelize.sync({ alter: true })
  .then(() => console.log('✅ Database synchronized'))
  .catch((err) => console.error('❌ Unable to sync database:', err));

// Routes
[
  'brandNotifications', 'category', 'notification', 'blackList', 'auth',
  'user', 'client', 'paymentMeth', 'paymentPlan', 'order',
  'product', 'brand', 'firstpp', 'secondpp', 'thirdpp', 'fourthpp'
].forEach(route => require(`./routes/${route}.routes`)(app));

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to BNPL application." });
});

// Start server
const PORT = process.env.DB_PORT;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running at http://0.0.0.0:${PORT}`);
});
