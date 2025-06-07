const db = require("../models");
const Product = db.product;
exports.updateProductById = async (productId, newData) => {
    try {
        // Utiliser la méthode update pour mettre à jour product
        const result = await Product.update(newData, {
            where: {
                id: productId
            }
        });
  
        // Vérifier le nombre d'enregistrements mis à jour
        console.log('Nombre d\'enregistrements mis à jour :', result[0]);
  
        // Renvoyer true si au moins un enregistrement a été mis à jour
        return result[0] > 0;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du product :', error);
        throw error;
    }
  };
// Fonction pour supprimer un product par ID
exports.deleteProductById  = async (productId) => {
  try {
      const product = await Product.destroy({
          where: {
              id: productId
          }
      });
      console.log('Nombre de products supprimés :', product);
  } catch (error) {
      console.error('Erreur lors de la suppression du product:', error);
      throw error;
  }
};
exports.getProductById = async (productId) => {
    try {
      const result = await Product.findOne({
        where: {
          id: productId,
        },
      });
  
      if (result) {
        console.log('Product:', result);
        return result.get({ plain: true }); 
      } else {
        console.log('Product not found');
        return null; 
      }
    } catch (error) {
      console.error('Error fetching Product:', error);
      throw error;
    }
  };
  // Fonction pour mettre à jour un utilisateur par ID
exports.updateUserById = async (userId, newData) => {
  try {
      // Utiliser la méthode update pour mettre à jour l'utilisateur
      const result = await User.update(newData, {
          where: {
              id: userId
          }
      });

      // Vérifier le nombre d'enregistrements mis à jour
      console.log('Nombre d\'enregistrements mis à jour :', result[0]);

      // Renvoyer true si au moins un enregistrement a été mis à jour
      return result[0] > 0;
  } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      throw error;
  }
};
 