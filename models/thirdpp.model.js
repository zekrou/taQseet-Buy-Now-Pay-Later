module.exports = (sequelize, Sequelize) => {
    const Thirdpp = sequelize.define("thirdpps", {
        third_installmentDate: {
        type: Sequelize.DATE
      },
      third_installmentPrice: {
        type: Sequelize.FLOAT
      },
      third_installmentStatus: {
        type: Sequelize.STRING
      },
    });
  
    return Thirdpp;
  };