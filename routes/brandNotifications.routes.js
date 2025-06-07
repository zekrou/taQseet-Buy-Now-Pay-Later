const db = require("../models");
const brandNotification = db.brandNotification;
const controller = require("../controllers/brandNotification.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  // Route pour supprimer une notif par ID
  app.delete('/notif/brand/del/:notifId', async (req, res) => {
    const notifId = req.params.notifId;
    try {
        await controller.deleteNotifById(notifId);
        res.status(200).send('Notification supprimée avec succès');
    } catch (error) {
        console.error('Erreur lors de la suppression de la notification :', error);
        res.status(500).send('Erreur lors de la suppression de la notification');
    }
  });
  
  app.post('/notif/brand', async (req, res) => {
      try {
          const notification = await brandNotification.create({
            title: req.body.title,
            description: req.body.description,
            brandId: req.body.brandId,
    
            });
          res.status(200).send('notification creé avec succès');
      } catch (error) {
          console.error('Erreur lors de la céation de la notification :', error);
          res.status(500).send('Erreur lors de la céation de la notification');
      }
    });


// Route pour récupérer les notifications par brand
app.get('/notifications/brand/:brandId', async (req, res) => {
    const brandId = req.params.brandId;
    try {
      const notifications = await controller.getClientNotifications(brandId);
       res.status(200).json(notifications);
   } catch (error) {
       res.status(500).send('Erreur',error);
   }
  });


  // Route to get the count of notifications for a user
app.get('/notifications/brand/count/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const count = await brandNotification.count({
            where: { brandId: userId }
        });
        res.status(200).send(count.toString());
    } catch (error) {
        console.error('Error fetching notification count:', error);
        res.status(500).send('Internal Server Error');
    }
});

}; 

