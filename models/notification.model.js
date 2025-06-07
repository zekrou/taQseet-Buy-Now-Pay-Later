module.exports = (sequelize, Sequelize) => {
    const Notification = sequelize.define("notifications", {
        title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
    });
  
    return Notification;
  };