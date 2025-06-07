const db = require("../models");
const Notification = db.notification;

// Fonction pour supprimer une Notification par ID
exports.deleteNotifById  = async (notifId) => {
  try {
      const notification = await Notification.destroy({
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
 // Récupérer les notifications du client
 exports.getClientNotifications = async (clientId) => {
    try {
      // Fetch payment plans directly by clientId
      const notifications = await Notification.findAll({
        where: {
          clientId: clientId
        },
    
      });
  
     
      console.log('Notifications:', notifications);
  
     
      return notifications;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw new Error('Error fetching notifications');
    }

  };
  

  