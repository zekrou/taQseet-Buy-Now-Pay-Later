const db = require("../models");
const Fourthpp = db.fourthpp;
const controller = require("../controllers/fourthpp.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.get('/fourth_installments', async (req, res) => {
    try {
        const installments = await Fourthpp.findAll(); 
        res.status(200).json(installments); 
    } catch (error) {
        console.error('Erreur lors de la récupération des installments :', error);
        res.status(500).send('Erreur lors de la récupération des installments');
    }
  });
    // Route pour récupérer unpaid installments
    app.get('/fourthpp/unpaid', controller.getAllUnpaidFourthpp);
  // Route pour récupérer un installment par ID
app.get('/frtinstallments/:installmentID', async (req, res) => {
  const installmentID = req.params.installmentID;

  try {
      const fourthpp = await Fourthpp.findByPk(installmentID); // Récupérer l installment par son ID depuis la base de données

      // Vérifier si l installment existe
      if (thirdpp) {
          res.status(200).json(thirdpp); // Renvoyer l installment sous forme de réponse JSON
      } else {
          res.status(404).send('installment non trouvé');
      }
  } catch (error) {
      console.error('Erreur lors de la récupération de installment :', error);
      res.status(500).send('Erreur lors de la récupération du installment');
  }
});
// Route pour mettre a jour un installment par ID
app.put('/frtinstallments/up/:installmentId', async (req, res) => {
  const installmentId = req.params.installmentId;
  const newData = req.body // Récupérer les données du corps de la requête

  try {
      const installmentUpdated = await controller.updateInstallmentById(installmentId, newData);
      if (installmentUpdated) {
          res.status(200).send('installment mis à jour avec succès');
      } else {
          res.status(404).send('installment non trouvé ou bien la modification de tels data est interdite');
      }
  } catch (error) {
      console.error('Erreur lors de la mise à jour de installment :', error);
      res.status(500).send('Erreur lors de la mise à jour de installment ');
  }
});


  // Route pour supprimer un installment par ID
  app.delete('/frtinstallments/del/:installmentId', async (req, res) => {
    const installmentId = req.params.installmentId;
    try {
        await controller.deleteInstallmentById(installmentId);
        res.status(200).send('installment supprimé avec succès');
    } catch (error) {
        console.error('Erreur lors de la suppression de l installment :', error);
        res.status(500).send('Erreur lors de la suppression de l installment');
    }
  });
  
  app.post('/frtinstallment', async (req, res) => {
      try {
          const fourthpp = await Fourthpp.create({
            fourth_installmentDate: req.body.fourth_installmentDate,
            fourth_installmentPrice: req.body.fourth_installmentPrice,
            fourth_installmentStatus: req.body.fourth_installmentStatus,
            paymentPlanId: req.body.paymentPlanId,
            });
          res.status(200).send('installment creé avec succès');
      } catch (error) {
          console.error('Erreur lors de la céation de l installment :', error);
          res.status(500).send('Erreur lors de la céation de l installment');
      }
    });




}; 
