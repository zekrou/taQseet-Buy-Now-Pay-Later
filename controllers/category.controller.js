const db = require("../models");
const Category = db.category;
const Brand = db.brand;
exports.getCategoryBrandsById = async (catId) => {
    try {
  
      const brands = await Brand.findAll({
        where: {
          categoryId: catId
        },
    
      });
  
      console.log('brands:', brands);
  
    
      return brands;
    } catch (error) {
      console.error('Error fetching  brands:', error);
      throw new Error('Error fetching  brands');
    }
  }; 