module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      userFirstName: {
        type: Sequelize.STRING
      },
      userLastName: {
        type: Sequelize.STRING
      },
      userBirthDate: {
        type: Sequelize.DATE
      },
      userType: {
        type: Sequelize.STRING
      },
      userGender: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      phoneNum: {
        type: Sequelize.BIGINT 
      },
      profilePic: {
        type: Sequelize.STRING
      },
    });
  
    return User;
  };