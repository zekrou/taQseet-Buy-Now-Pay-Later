module.exports = (sequelize, Sequelize) => {
    const Fourthpp = sequelize.define("fourthpps", {
        fourth_installmentDate: {
        type: Sequelize.DATE
      },
      fourth_installmentPrice: {
        type: Sequelize.FLOAT
      },
      fourth_installmentStatus: {
        type: Sequelize.STRING
      },
    });
  
    return Fourthpp;
  };