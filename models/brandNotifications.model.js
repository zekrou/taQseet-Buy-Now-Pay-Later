module.exports = (sequelize, Sequelize) => {
    const brandNotification = sequelize.define("brandNotifications", {
        title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
    });
  
    return brandNotification;
  };