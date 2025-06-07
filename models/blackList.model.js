module.exports = (sequelize, Sequelize) => {
    const BlackList = sequelize.define("blackList", {
      description: {
        type: Sequelize.STRING
      },
    });
  
    return BlackList;
  };