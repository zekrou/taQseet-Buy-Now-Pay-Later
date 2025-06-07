module.exports = (sequelize, Sequelize) => {
    const Brand = sequelize.define("brands", {
      brandLogo: {
        type: Sequelize.STRING
      },
      brandName: {
        type: Sequelize.STRING
      },
      brandLocation: {
        type: Sequelize.STRING
      },
      brandFeesStatus: {
        type: Sequelize.STRING
      },
      files: {
        type: Sequelize.STRING
      },
   
    });
  
    return Brand;
  };