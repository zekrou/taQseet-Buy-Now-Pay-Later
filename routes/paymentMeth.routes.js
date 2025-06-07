const db = require("../models");
const PaymentMeth = db.paymentMeth;
const controller = require("../controllers/paymentMeth.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
// Route pour récupérer tous les paymentMeths
app.get('/paymentMeths', async (req, res) => {
  try {
      const paymentMeths = await PaymentMeth.findAll(); // Récupérer tous les paymentMeths depuis la base de données
      res.status(200).json(paymentMeths); // Renvoyer les paymentMeths sous forme de réponse JSON
  } catch (error) {
      console.error('Erreur lors de la récupération des paymentMeths :', error);
      res.status(500).send('Erreur lors de la récupération des paymentMeths');
  }
});
  // Route pour récupérer une paymentMeth par ID
app.get('/paymentMeths/:paymentMethId', async (req, res) => {
  const paymentMethId = req.params.paymentMethId;

  try {
      const paymentMeth = await PaymentMeth.findByPk(paymentMethId); // Récupérer paymentMeth par son ID depuis la base de données

      // Vérifier si l'paymentMeth existe
      if (paymentMeth) {
          res.status(200).json(paymentMeth); // Renvoyer paymentMeth sous forme de réponse JSON
      } else {
          res.status(404).send('paymentMeth non trouvé');
      }
  } catch (error) {
      console.error('Erreur lors de la récupération du paymentMeth :', error);
      res.status(500).send('Erreur lors de la récupération du paymentMeth');
  }
});
// Route pour supprimer une paymentMeth par ID
app.delete('/paymentMeths/del/:paymentMethId', async (req, res) => {
  const paymentMethId = req.params.paymentMethId;
  try {
      await controller.deletePaymentMethById(paymentMethId);
      res.status(200).send('paymentMeth(carte) supprimé avec succès');
  } catch (error) {
      console.error('Erreur lors de la suppression du paymentMeth :', error);
      res.status(500).send('Erreur lors de la suppression du paymentMeth');
  }
});
// Route pour mettre a jour un paymentMeth par ID
app.put('/paymentMeths/up/:paymentMethId', async (req, res) => {
  const paymentMethId = req.params.paymentMethId;
  const newData = req.body // Récupérer les données du corps de la requête

  try {
      const paymentMethUpdated = await controller.updateUserById(paymentMethId, newData);
      if (paymentMethUpdated) {
          res.status(200).send('paymentMeth mis à jour avec succès');
      } else {
          res.status(404).send('paymentMeth non trouvé ou bien la modification de tels data est interdite');
      }
  } catch (error) {
      console.error('Erreur lors de la mise à jour du paymentMeth :', error);
      res.status(500).send('Erreur lors de la mise à jour du paymentMeth');
  }
});

app.post('/paymentMeth', async (req, res) => {
  try {
      const paymentMeth = await PaymentMeth.create({
        expDate: req.body. expDate,
        cardNum: req.body.cardNum,
        cvv: req.body.cvv,
        clientId:  req.body.clientId,
        });
      res.status(200).send('paymentMeth creé avec succès');
  } catch (error) {
      console.error('Erreur lors de la céation du paymentMeth :', error);
      res.status(500).send('Erreur lors de la céation du paymentMeth');
  }
});







}; 
