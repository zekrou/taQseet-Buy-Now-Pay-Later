module.exports = (sequelize, Sequelize) => {
    const Rating = sequelize.define("Rating", {
      rating: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
    
    });
  
    return Rating;
  };
  