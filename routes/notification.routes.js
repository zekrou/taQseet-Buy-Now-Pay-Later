const db = require("../models");
const Notification = db.notification;
const controller = require("../controllers/notification.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  // Route pour supprimer une notif par ID
  app.delete('/notif/del/:notifId', async (req, res) => {
    const notifId = req.params.notifId;
    try {
        await controller.deleteNotifById(notifId);
        res.status(200).send('Notification supprimée avec succès');
    } catch (error) {
        console.error('Erreur lors de la suppression de la notification :', error);
        res.status(500).send('Erreur lors de la suppression de la notification');
    }
  });
  
  app.post('/notif', async (req, res) => {
      try {
          const notification = await Notification.create({
            title: req.body.title,
            description: req.body.description,
            clientId: req.body.clientId,
    
            });
          res.status(200).send('notification creé avec succès');
      } catch (error) {
          console.error('Erreur lors de la céation de la notification :', error);
          res.status(500).send('Erreur lors de la céation de la notification');
      }
    });


// Route pour récupérer les notifications par client
app.get('/notifications/:clientId', async (req, res) => {
    const clientId = req.params.clientId;
    try {
      const notifications = await controller.getClientNotifications(clientId);
       res.status(200).json(notifications);
   } catch (error) {
       res.status(500).send('Erreur',error);
   }
  });


  // Route to get the count of notifications for a user
app.get('/notifications/count/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const count = await Notification.count({
            where: { clientId: userId }
        });
        res.status(200).send(count.toString());
    } catch (error) {
        console.error('Error fetching notification count:', error);
        res.status(500).send('Internal Server Error');
    }
});

}; 

