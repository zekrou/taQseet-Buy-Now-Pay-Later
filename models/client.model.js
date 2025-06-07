module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("clients", {
    
     files: {
        type: Sequelize.STRING
      },
  
    });
  
    return Client;
  };