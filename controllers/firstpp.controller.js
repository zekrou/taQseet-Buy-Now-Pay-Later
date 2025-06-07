const db = require("../models");
const Firstpp = db.firstpp;

exports.updateInstallmentById = async (instId, newData) => {
    try {
    
        const result = await Firstpp.update(newData, {
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
      const firstpp = await Firstpp.destroy({
          where: {
              id: instId
          }
      });
      console.log('Nombre d\'items supprimés :', firstpp);
  } catch (error) {
      console.error('Erreur lors de la suppression de l\'installment:', error);
      throw error;
  }
};
exports.getAllUnpaidFirstpp = async (req, res) => {
    try {
      const unpaidFirstpp = await Firstpp.findAll({
        where: {
          first_installmentStatus: 'unpaid' // Adjust the field name based on your schema
        }
      });
  
      res.status(200).json(unpaidFirstpp);
    } catch (error) {
      console.error('Error fetching unpaid firstpp:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  