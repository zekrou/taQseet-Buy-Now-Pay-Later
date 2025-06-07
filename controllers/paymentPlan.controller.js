
const db = require("../models");
const PaymentPlan = db.paymentPlan;
const Firstpp = db.firstpp;
const Secondpp = db.secondpp;
const Thirdpp = db.thirdpp;
const Fourthpp = db.fourthpp;
  // Fonction pour supprimer une paymentPlan par ID
exports.deletePaymentPlanById  = async (paymentPlanId) => {
    try {
        const paymentPlan = await PaymentPlan.destroy({
            where: {
                id: paymentPlanId
            }
        });
        console.log('Nombre de paymentPlan supprimés :', paymentPlan);
    } catch (error) {
        console.error('Erreur lors de la suppression du paymentPlan :', error);
        throw error;
    }
  };
// Function to get only the installments of a PaymentPlan
exports.getPaymentPlanInstallments = async (ppId) => {
  try {
    // Fetch the installments directly by paymentPlanId
    const firstpp = await Firstpp.findOne({ where: { paymentPlanId: ppId } });
    const secondpp = await Secondpp.findOne({ where: { paymentPlanId: ppId } });
    const thirdpp = await Thirdpp.findOne({ where: { paymentPlanId: ppId,} });
    const fourthpp = await Fourthpp.findOne({ where: { paymentPlanId: ppId } });

    // Check if installments are found
    if (firstpp || secondpp || thirdpp || fourthpp) {
      return {
        firstpp,
        secondpp,
        thirdpp,
        fourthpp,
      }; // Return only the installments
    } else {
      return null; // No installments found for this payment plan ID
    }
  } catch (error) {
    console.error('Error fetching installments:', error);
    throw error;
  }
};
  