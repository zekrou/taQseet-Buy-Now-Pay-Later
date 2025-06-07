module.exports = (sequelize, Sequelize) => {
    const PaymentMeth = sequelize.define("paymentMeth", {
    
      cardNum: {
        type: Sequelize.BIGINT  
      },
      expDate: {
        type: Sequelize.DATE
      },
      cvv: {
        type: Sequelize.STRING
      },

    });
  
    return PaymentMeth;
  };