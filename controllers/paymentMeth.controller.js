
const db = require("../models");
const PaymentMeth = db.paymentMeth;

// Fonction pour mettre à jour un paymentMeth par ID
exports.updatePaymentMethById = async (paymentMethId, newData) => {
    try {
        // Utiliser la méthode update pour mettre à jour le paymentMeth
        const result = await PaymentMeth.update(newData, {
            where: {
                id: paymentMethId
            }
        });
  
        // Vérifier le nombre d'enregistrements mis à jour
        console.log('Nombre d\'enregistrements mis à jour :', result[0]);
  
        // Renvoyer true si au moins un enregistrement a été mis à jour
        return result[0] > 0;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du paymentMeth :', error);
        throw error;
    }
  };
  // Fonction pour supprimer une paymentMeth par ID
exports.deletePaymentMethById  = async (paymentMethId) => {
    try {
        const paymentMeth = await PaymentMeth.destroy({
            where: {
                id: paymentMethId
            }
        });
        console.log('Nombre de paymentMeths supprimés :', paymentMeth);
    } catch (error) {
        console.error('Erreur lors de la suppression du paymentMeth :', error);
        throw error;
    }
  };