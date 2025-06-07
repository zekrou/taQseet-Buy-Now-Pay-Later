const db = require("../models");
const Brand = db.brand;
const Product = db.product;
const brandNotification = db.brandNotification;
// Fonction pour supprimer une brand par ID
exports.deleteBrandById  = async (brandId) => {
  try {
      const brand = await Brand.destroy({
          where: {
              id: brandId
          }
      });
      console.log('Nombre des brands supprimés :', brand);
  } catch (error) {
      console.error('Erreur lors de la suppression du brand:', error);
      throw error;
  }
};
// Fonction pour mettre à jour le brand par ID
exports.updateBrandById = async (brandId, newData) => {
    try {
        // Utiliser la méthode update pour mettre à jour le brand
        const result = await Brand.update(newData, {
            where: {
                id: brandId
            }
        });
  
        // Vérifier le nombre d'enregistrements mis à jour
        console.log('Nombre d\'enregistrements mis à jour :', result[0]);
  
        // Renvoyer true si au moins un enregistrement a été mis à jour
        return result[0] > 0;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du brand :', error);
        throw error;
    }
  };

 exports.getBrandProductsById = async (brandId) => {
  try {

    const products = await Product.findAll({
      where: {
        brandId: brandId
      },
  
    });

    console.log('Products:', products);

  
    return products;
  } catch (error) {
    console.error('Error fetching  products:', error);
    throw new Error('Error fetching  products');
  }
};
// Récupérer une brand et ses produits par id
exports.getBrandWithProductsById = async (brandId) => {
    try {
      const brand = await Brand.findByPk(brandId, {
        include: [{
          model: Product,
     
        }]
      });
  
      if (brand) {
        return brand; // Cet objet contient maintenant le brand et ses produits
      } else {
        return null; // Pas de brand trouvée avec cet ID
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du brand :', error);
      throw error;
    }
  };
 
  exports.getBrandById = async (brandId) => {
    try {
      const result = await Brand.findOne({
        where: {
          id: brandId,
        },
      });
  
      if (result) {
        console.log('Brand:', result);
        return result.get({ plain: true }); // Return plain JavaScript object
      } else {
        console.log('Brand not found');
        return null; // Return null if no brand is found
      }
    } catch (error) {
      console.error('Error fetching brand:', error);
      throw error;
    }
  };

  exports.getBrandIdByUserId = async (userId) => {
    try {
      const brand = await Brand.findOne({
        where: { userId: userId },
      });
  
      if (!brand) {
        return { status: 404, message: 'Brand not found' };
      }
  
      return { status: 200, brandId: brand.id };
    } catch (error) {
      console.error('Error fetching brand:', error);
      return { status: 500, message: 'Server error' };
    }
  };
  // Suppress brand notifications
exports.deleteBrandNotifs = async (brandId) => {
  try {
    // Delete notifications directly by brandId
    const result = await brandNotification.destroy({
      where: {
        brandId: brandId
      }
    });

    // Log the number of notifications deleted for debugging
    console.log(`Notifications deleted: ${result}`);

    // Return the result
    return result;
  } catch (error) {
    console.error('Error deleting notifications:', error);
    throw new Error('Error deleting notifications');
  }
};