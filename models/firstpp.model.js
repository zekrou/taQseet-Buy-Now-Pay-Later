module.exports = (sequelize, Sequelize) => {
    const Firstpp = sequelize.define("firstpps", {
      first_installmentDate: {
        type: Sequelize.DATE
      },
      first_installmentPrice: {
        type: Sequelize.FLOAT
      },
      first_installmentStatus: {
        type: Sequelize.STRING
      },
    });
  
    return Firstpp;
  };