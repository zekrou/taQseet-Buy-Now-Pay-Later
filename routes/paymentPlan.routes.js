const db = require("../models");
const PaymentPlan = db.paymentPlan;
const controller = require("../controllers/paymentPlan.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
// Route pour récupérer tous les paymentPlans
app.get('/paymentPlans', async (req, res) => {
  try {
      const paymentPlans = await PaymentPlan.findAll(); // Récupérer tous les paymentPlans depuis la base de données
      res.status(200).json(paymentPlans); // Renvoyer les paymentPlans sous forme de réponse JSON
  } catch (error) {
      console.error('Erreur lors de la récupération des paymentPlans :', error);
      res.status(500).send('Erreur lors de la récupération des paymentPlans');
  }
});
  // Route pour récupérer une paymentPlan par ID
app.get('/paymentPlans/:paymentPlanId', async (req, res) => {
  const paymentPlanId = req.params.paymentPlanId;

  try {
      const paymentPlan = await PaymentPlan.findByPk(paymentPlanId); // Récupérer paymentPlan par son ID depuis la base de données

      // Vérifier si l'paymentPlan existe
      if (paymentPlan) {
          res.status(200).json(paymentPlan); // Renvoyer paymentPlan sous forme de réponse JSON
      } else {
          res.status(404).send('paymentPlan non trouvé');
      }
  } catch (error) {
      console.error('Erreur lors de la récupération du paymentPlan :', error);
      res.status(500).send('Erreur lors de la récupération du paymentPlan');
  }
});
// Route pour supprimer une paymentPlan par ID
app.delete('/paymentPlan/del/:paymentPlanId', async (req, res) => {
  const paymentPlanId = req.params.paymentPlanId;
  try {
      await controller.deletePaymentPlanById(paymentPlanId);
      res.status(200).send('paymentPlan supprimé avec succès');
  } catch (error) {
      console.error('Erreur lors de la suppression du paymentPlan :', error);
      res.status(500).send('Erreur lors de la suppression du paymentPlan');
  }
});

app.post('/paymentPlan', async (req, res) => {
    try {
        const paymentPlan = await PaymentPlan.create({
            OrderId: req.body.OrderId,
           clientId:  req.body.clientId
          });
        res.status(200).send({id: paymentPlan.id,});
    } catch (error) {
        console.error('Erreur lors de la céation du paymentPlan :', error);
        res.status(500).send('Erreur lors de la céation du paymentPlan');
    }
  });

  app.get('/paymentPlanInst/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const details = await controller.getPaymentPlanInstallments(id);
      if (details) {
        res.json(details);
      } else {
        res.status(404).send('installments not found');
      }
    } catch (error) {
      console.error('Failed to retrieve installments :', error);
      res.status(500).send('Server error');
    }
  });


}; 
