module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("Product", {
    productPic: {
      type: Sequelize.STRING
    },
    productName: {
      type: Sequelize.STRING
    },
    productDescription: {
      type: Sequelize.STRING
    },
    productPrice: {
      type: Sequelize.FLOAT
    },
    rating: {
      type: Sequelize.FLOAT,
      defaultValue: 0
    }
  });

  return Product;
};
