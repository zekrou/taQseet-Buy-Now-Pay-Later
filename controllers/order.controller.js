const db = require("../models");
const Order = db.order;
const Product = db.product;
const PaymentPlan = db.paymentPlan;
// Fonction pour supprimer un ordre par ID
exports.deleteOrderById  = async (orderId) => {
  try {
      const order = await Order.destroy({
          where: {
              id: orderId
          }
      });
      console.log('Nombre d\'orders supprimés :', order);
  } catch (error) {
      console.error('Erreur lors de la suppression de l\'ordre:', error);
      throw error;
  }
};
// Récupérer une commande et ses produits 
exports.getOrderWithProducts = async (orderId) => {
    try {
      const order = await Order.findByPk(orderId, {
        include: [{
          model: Product,
     
        }]
      });
  
      if (order) {
        return order; // Cet objet contient maintenant la commande et ses produits
      } else {
        return null; // Pas de commande trouvée avec cet ID
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la commande :', error);
      throw error;
    }
  };
  // Récupérer une commande et le paymentPlan
exports.getOrderWithPaymentPlan = async (orderId) => {
  try {
    const order = await Order.findByPk(orderId, {
      include: [{
        model: PaymentPlan,
   
      }]
    });

    if (order) {
      return order; // Cet objet contient maintenant la commande et le paymentPlan
    } else {
      return null; // Pas de commande trouvée avec cet ID
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la commande :', error);
    throw error;
  }
};