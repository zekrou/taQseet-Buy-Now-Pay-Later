const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.rating = require("./rating.model.js")(sequelize, Sequelize); 
db.brandNotification = require("./brandNotifications.model.js")(sequelize, Sequelize); 
db.notification = require("./notification.model.js")(sequelize, Sequelize); 
db.token = require("./token.model.js")(sequelize, Sequelize); 
db.blackList = require("../models/blackList.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.client = require("../models/client.model.js")(sequelize, Sequelize);
db.paymentMeth = require("../models/paymentMeth.model.js")(sequelize, Sequelize);
db.paymentPlan = require("../models/paymentPlan.model.js")(sequelize, Sequelize);
db.order = require("../models/order.model.js")(sequelize, Sequelize);
db.product = require("./product.model.js")(sequelize, Sequelize);
db.brand = require("./brand.model.js")(sequelize, Sequelize);
db.firstpp= require("../models/firstpp.model.js")(sequelize, Sequelize);
db.secondpp= require("../models/secondpp.model.js")(sequelize, Sequelize);
db.thirdpp= require("../models/thirdpp.model.js")(sequelize, Sequelize);
db.fourthpp= require("../models/fourthpp.model.js")(sequelize, Sequelize);
db.orderProduct= require("../models/orderProduct.model.js")(sequelize, Sequelize);
db.category= require("../models/category.model.js")(sequelize, Sequelize);
//relation one-to-one blackList_user
db.user.hasOne(db.blackList, {
  onDelete: 'cascade',
});
db.blackList.belongsTo(db.user);
//relation one-to-one user_client
db.user.hasOne(db.client, {
  onDelete: 'cascade',
});
db.client.belongsTo(db.user);
//relation one-to-one user_brand
db.user.hasOne(db.brand, {
  onDelete: 'cascade',
});
db.brand.belongsTo(db.user);
//relation one-to-many client_paymentMeth
db.client.hasMany(db.paymentMeth, {
  onDelete: 'cascade',
});
db.paymentMeth.belongsTo(db.client);
//relation one-to-many brand_category
db.category.hasMany(db.brand, {
  onDelete: 'cascade',
});
db.brand.belongsTo(db.category);
//relation one-to-many client_order
db.client.hasMany(db.order);
db.order.belongsTo(db.client);

//relation many-to-many order_product
db.order.belongsToMany(db.product, { through: db.orderProduct});
db.product.belongsToMany(db.order, { through: db.orderProduct});

//relation one-to-one order_paymentPlan
db.order.hasOne(db.paymentPlan,{onDelete: 'cascade',});
db.paymentPlan.belongsTo(db.order);
//relation one-to-many client_paymentPlan
db.client.hasMany(db.paymentPlan);
db.paymentPlan.belongsTo(db.client);
//relation one-to-one paymentPlan_firstpp
db.paymentPlan.hasOne(db.firstpp, {
  onDelete: 'cascade',
});
db.firstpp.belongsTo(db.paymentPlan);
//relation one-to-one paymentPlan_secondpp
db.paymentPlan.hasOne(db.secondpp, {
  onDelete: 'cascade',
});
db.secondpp.belongsTo(db.paymentPlan);
//relation one-to-one paymentPlan_thirdpp
db.paymentPlan.hasOne(db.thirdpp, {
  onDelete: 'cascade',
});
db.thirdpp.belongsTo(db.paymentPlan);
//relation one-to-one paymentPlan_fourthpp
db.paymentPlan.hasOne(db.fourthpp, {
  onDelete: 'cascade',
});
db.fourthpp.belongsTo(db.paymentPlan);
//relation one-to-many brand_product
db.brand.hasMany(db.product, {
  onDelete: 'cascade',
});
db.product.belongsTo(db.brand);
//relation one-to-many client_notifications
db.client.hasMany(db.notification, {
  onDelete: 'cascade',
});
db.notification.belongsTo(db.client);
//relation one-to-many brand_notifications
db.brand.hasMany(db.brandNotification, {
  onDelete: 'cascade',
});
db.brandNotification.belongsTo(db.brand);

//product-rating one to many 
db.product.hasMany(db.rating);
db.rating.belongsTo(db.product);
//rating-users one to many 
db.user.hasMany(db.rating);
db.rating.belongsTo(db.user);


module.exports = db;