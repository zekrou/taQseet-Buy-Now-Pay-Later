require("dotenv").config();
const { Sequelize } = require("sequelize");
const config = require("../config/db.config");

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: config.DIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// MODELS
db.rating = require("./rating.model")(sequelize, Sequelize);
db.brandNotification = require("./brandNotifications.model")(sequelize, Sequelize);
db.notification = require("./notification.model")(sequelize, Sequelize);
db.token = require("./token.model")(sequelize, Sequelize);
db.blackList = require("./blackList.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
db.client = require("./client.model")(sequelize, Sequelize);
db.paymentMeth = require("./paymentMeth.model")(sequelize, Sequelize);
db.paymentPlan = require("./paymentPlan.model")(sequelize, Sequelize);
db.order = require("./order.model")(sequelize, Sequelize);
db.product = require("./product.model")(sequelize, Sequelize);
db.brand = require("./brand.model")(sequelize, Sequelize);
db.firstpp = require("./firstpp.model")(sequelize, Sequelize);
db.secondpp = require("./secondpp.model")(sequelize, Sequelize);
db.thirdpp = require("./thirdpp.model")(sequelize, Sequelize);
db.fourthpp = require("./fourthpp.model")(sequelize, Sequelize);
db.orderProduct = require("./orderProduct.model")(sequelize, Sequelize);
db.category = require("./category.model")(sequelize, Sequelize);

// RELATIONS
db.user.hasOne(db.blackList, { onDelete: 'cascade' });
db.blackList.belongsTo(db.user);

db.user.hasOne(db.client, { onDelete: 'cascade' });
db.client.belongsTo(db.user);

db.user.hasOne(db.brand, { onDelete: 'cascade' });
db.brand.belongsTo(db.user);

db.client.hasMany(db.paymentMeth, { onDelete: 'cascade' });
db.paymentMeth.belongsTo(db.client);

db.category.hasMany(db.brand, { onDelete: 'cascade' });
db.brand.belongsTo(db.category);

db.client.hasMany(db.order);
db.order.belongsTo(db.client);

db.order.belongsToMany(db.product, { through: db.orderProduct });
db.product.belongsToMany(db.order, { through: db.orderProduct });

db.order.hasOne(db.paymentPlan, { onDelete: 'cascade' });
db.paymentPlan.belongsTo(db.order);

db.client.hasMany(db.paymentPlan);
db.paymentPlan.belongsTo(db.client);

db.paymentPlan.hasOne(db.firstpp, { onDelete: 'cascade' });
db.firstpp.belongsTo(db.paymentPlan);

db.paymentPlan.hasOne(db.secondpp, { onDelete: 'cascade' });
db.secondpp.belongsTo(db.paymentPlan);

db.paymentPlan.hasOne(db.thirdpp, { onDelete: 'cascade' });
db.thirdpp.belongsTo(db.paymentPlan);

db.paymentPlan.hasOne(db.fourthpp, { onDelete: 'cascade' });
db.fourthpp.belongsTo(db.paymentPlan);

db.brand.hasMany(db.product, { onDelete: 'cascade' });
db.product.belongsTo(db.brand);

db.client.hasMany(db.notification, { onDelete: 'cascade' });
db.notification.belongsTo(db.client);

db.brand.hasMany(db.brandNotification, { onDelete: 'cascade' });
db.brandNotification.belongsTo(db.brand);

db.product.hasMany(db.rating);
db.rating.belongsTo(db.product);

db.user.hasMany(db.rating);
db.rating.belongsTo(db.user);

module.exports = db;
