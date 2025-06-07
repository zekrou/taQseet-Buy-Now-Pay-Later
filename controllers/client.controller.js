
const db = require("../models");
const Client = db.client;
const Order = db.order;
const PaymentPlan = db.paymentPlan;
const PaymentMeth = db.paymentMeth;
const Notification = db.notification;
// Fonction pour mettre à jour un client par ID
exports.updateClientById = async (clientId, newData) => {
    try {
        // Utiliser la méthode update pour mettre à jour le client
        const result = await Client.update(newData, {
            where: {
                id: clientId
            }
        });
  
        // Vérifier le nombre d'enregistrements mis à jour
        console.log('Nombre d\'enregistrements mis à jour :', result[0]);
  
        // Renvoyer true si au moins un enregistrement a été mis à jour
        return result[0] > 0;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du client :', error);
        throw error;
    }
  };

// Récupérer les orders du client
exports.getClientOrders = async (clientId) => {
  try {
    // Fetch orders directly by clientId
    const orders = await Order.findAll({
      where: {
        clientId: clientId
      },
      attributes: { exclude: ['clientId'] } // Exclude clientId if necessary
    });

    // Log the orders for debugging
    console.log('orders:', orders);

    // Return the orders
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Error fetching orders');
  }
};
 // Récupérer les paymentPlan du client
 exports.getClientPaymentPlans = async (clientId) => {
  try {
    // Fetch payment plans directly by clientId
    const paymentPlans = await PaymentPlan.findAll({
      where: {
        clientId: clientId
      },
  
    });

    // Log the payment plans for debugging
    console.log('Payment plans:', paymentPlans);

    // Return the payment plans
    return paymentPlans;
  } catch (error) {
    console.error('Error fetching payment plans:', error);
    throw new Error('Error fetching payment plans');
  }
};

// Suppress client notifications
exports.deleteClientNotifs = async (clientId) => {
  try {
    // Delete notifications directly by clientId
    const result = await Notification.destroy({
      where: {
        clientId: clientId
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

   // Récupérer les paymentMeths du client 
   exports.getClientPaymentMeths = async (clientId) => {
    try {
      // Fetch paymentMeths directly by clientId
      const paymentMeths = await PaymentMeth.findAll({
        where: {
          clientId: clientId
        },
        attributes: { exclude: ['clientId'] } // Exclude clientId if necessary
      });
  
      // Log the paymentMeths for debugging
      console.log('paymentMeths:', paymentMeths);
  
      // Return the paymentMeths
      return paymentMeths;
    } catch (error) {
      console.error('Error fetching paymentMeths:', error);
      throw new Error('Error fetching paymentMeths');
    }
    
  };