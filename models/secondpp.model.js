module.exports = (sequelize, Sequelize) => {
    const Secondpp = sequelize.define("secondpps", {
      second_installmentDate: {
        type: Sequelize.DATE
      },
      second_installmentPrice: {
        type: Sequelize.FLOAT
      },
      second_installmentStatus: {
        type: Sequelize.STRING
      },
    });
  
    return Secondpp;
  };