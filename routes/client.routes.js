const db = require("../models");
const Client = db.client;
const controller = require("../controllers/client.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
// Route pour récupérer tous les Clients
app.get('/clients', async (req, res) => {
  try {
      const clients = await Client.findAll(); // Récupérer tous les Clients depuis la base de données
      res.status(200).json(clients); // Renvoyer les Clients sous forme de réponse JSON
  } catch (error) {
      console.error('Erreur lors de la récupération des Marchands :', error);
      res.status(500).send('Erreur lors de la récupération des Marchands');
  }
});
  // Route pour récupérer un Client par ID
app.get('/clients/:clientId', async (req, res) => {
  const clientId = req.params.clientId;

  try {
      const client = await Client.findByPk(clientId); // Récupérer le Client par son ID depuis la base de données

      // Vérifier si le Client existe
      if (client) {
          res.status(200).json(client); // Renvoyer le Client sous forme de réponse JSON
      } else {
          res.status(404).send('Client non trouvé');
      }
  } catch (error) {
      console.error('Erreur lors de la récupération du Client :', error);
      res.status(500).send('Erreur lors de la récupération du Client');
  }
});
// Route pour mettre a jour un Client par ID
app.put('/clients/up/:clientId', async (req, res) => {
  const clientId = req.params.clientId;
  const newData = req.body // Récupérer les données du corps de la requête

  try {
      const clientUpdated = await controller.updateClientById(clientId, newData);
      if (clientUpdated) {
          res.status(200).send('Client mis à jour avec succès');
      } else {
          res.status(404).send('Client non trouvé ou bien la modification de tels data est interdite');
      }
  } catch (error) {
      console.error('Erreur lors de la mise à jour du Client :', error);
      res.status(500).send('Erreur lors de la mise à jour du Client ');
  }
});

  // Route pour récupérer les ordres par client
  app.get('/ordersC/:clientId', async (req, res) => {
    const clientId = req.params.clientId;
    try {
      const orders = await controller.getClientOrders(clientId);
       res.status(200).json(orders);
   } catch (error) {
       res.status(500).send('Erreur',error);
   }
  });

  

// Route pour récupérer les paymentPlans par client
app.get('/client/paymentPlans/:clientId', async (req, res) => {
  const clientId = req.params.clientId;
  try {
    const paymentPlans = await controller.getClientPaymentPlans(clientId);
     res.status(200).json(paymentPlans);
 } catch (error) {
     res.status(500).send('Erreur',error);
 }
});

    // Route pour récupérer les paymentMeths par client
    app.get('/client/paymentMeths/:clientId', async (req, res) => {
      const clientId = req.params.clientId;
      try {
         const paymentMeths = await controller.getClientPaymentMeths(clientId);
          res.status(200).json(paymentMeths);
      } catch (error) {
          res.status(500).send('Erreur',error);
      }
    });

// Route to delete notifications for a specific client
app.delete('/notifications/delAll/:clientId', async (req, res) => {
  const clientId = req.params.clientId;
  
  try {
    const result = await controller.deleteClientNotifs(clientId);

    if (result > 0) {
      res.status(200).json({ message: `Deleted ${result} notifications.` });
    } else {
      res.status(404).json({ message: 'No notifications found for this client.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Endpoint to get client details by client ID
app.get('/clients/userId/:clientId', async (req, res) => {
  const { clientId } = req.params;
  try {
    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch client details' });
  }
});
}; 
