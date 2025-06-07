const db = require("../models");
const Fourthpp = db.fourthpp;

exports.updateInstallmentById = async (instId, newData) => {
    try {
    
        const result = await Fourthpp.update(newData, {
            where: {
                id: instId
            }
        });
  
        // Vérifier le nombre d'enregistrements mis à jour
        console.log('Nombre d\'enregistrements mis à jour :', result[0]);
  
        // Renvoyer true si au moins un enregistrement a été mis à jour
        return result[0] > 0;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l installement :', error);
        throw error;
    }
  };
// Fonction pour supprimer un installment par ID
exports.deleteInstallmentById  = async (instId) => {
  try {
      const fourthpp = await Fourthpp.destroy({
          where: {
              id: instId
          }
      });
      console.log('Nombre d\'items supprimés :', fourthpp);
  } catch (error) {
      console.error('Erreur lors de la suppression de l\'installment:', error);
      throw error;
  }
};
exports.getAllUnpaidFourthpp = async (req, res) => {
    try {
      const unpaidFourthpp = await Fourthpp.findAll({
        where: {
          fourth_installmentStatus: 'unpaid' // Adjust the field name based on your schema
        }
      });
  
      res.status(200).json(unpaidFourthpp);
    } catch (error) {
      console.error('Error fetching unpaid unpaidFourthpp:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };