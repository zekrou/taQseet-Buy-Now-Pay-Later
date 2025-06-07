const db = require("../models");
const brandNotification = db.brandNotification;

// Fonction pour supprimer une Notification par ID
exports.deleteNotifById  = async (notifId) => {
  try {
      const notification = await brandNotification.destroy({
          where: {
              id: notifId
          }
      });
      console.log('Nombre d\'items supprimés :', notification);
  } catch (error) {
      console.error('Erreur lors de la suppression de la notification:', error);
      throw error;
  }
};
 // Récupérer les notifications du brand
 exports.getClientNotifications = async (brandId) => {
    try {
      // Fetch payment plans directly by brandId
      const notifications = await brandNotification.findAll({
        where: {
            brandId: brandId
        },
    
      });
  
     
      console.log('Notifications:', notifications);
  
     
      return notifications;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw new Error('Error fetching notifications');
    }

  };
  

  