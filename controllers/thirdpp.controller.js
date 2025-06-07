const db = require("../models");
const Thirdpp = db.thirdpp;

exports.updateInstallmentById = async (instId, newData) => {
    try {
    
        const result = await Thirdpp.update(newData, {
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
      const thirdpp = await Thirdpp.destroy({
          where: {
              id: instId
          }
      });
      console.log('Nombre d\'items supprimés :', thirdpp);
  } catch (error) {
      console.error('Erreur lors de la suppression de l\'installment:', error);
      throw error;
  }
};
exports.getAllUnpaidThirdpp = async (req, res) => {
    try {
      const unpaidThirdpp = await Thirdpp.findAll({
        where: {
          third_installmentStatus: 'unpaid' // Adjust the field name based on your schema
        }
      });
  
      res.status(200).json(unpaidThirdpp);
    } catch (error) {
      console.error('Error fetching unpaid unpaidThirdpp:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };