module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("Order", {
  
      orderDescription: {
        type: Sequelize.STRING
      },
      totalCost: {
        type: Sequelize.FLOAT
      },
   
    });

    return Order;
  };