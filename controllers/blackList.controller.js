const db = require("../models");
const BlackList = db.blackList;
const User = db.user;
// Fonction pour supprimer une de blackList par ID
exports.deleteBlackListById  = async (blackListId) => {
  try {
      const blackList = await BlackList.destroy({
          where: {
              id: blackListId
          }
      });
      console.log('Nombre des blackLists supprimés :', blackList);
  } catch (error) {
      console.error('Erreur lors de la suppression du blackList:', error);
      throw error;
  }
};
// Fonction pour mettre à jour le blackList par ID
exports.updateBlackListById = async (blackListId, newData) => {
    try {
        // Utiliser la méthode update pour mettre à jour le blackList
        const result = await BlackList.update(newData, {
            where: {
                id: blackListId
            }
        });
  
        // Vérifier le nombre d'enregistrements mis à jour
        console.log('Nombre d\'enregistrements mis à jour :', result[0]);
  
        // Renvoyer true si au moins un enregistrement a été mis à jour
        return result[0] > 0;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du blackList :', error);
        throw error;
    }
  };
// Récupérer une blackList et ses users
exports.getBlackListWithUser = async (blackListId) => {
    try {
      const blackList = await BlackList.findByPk(blackListId, {
        include: [{
          model: User,
     
        }]
      });
  
      if (blackList) {
        return blackList; // Cet objet contient maintenant le blackList et ses users
      } else {
        return null; // Pas de blackList trouvée avec cet ID
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du blackList :', error);
      throw error;
    }
  };
// Controller method to delete blacklist by userId
exports.deleteBlackListByUserId = async (userId) => {
  try {
      await BlackList.destroy({
          where: { userId: userId }
      });
  } catch (error) {
      console.error('Erreur lors de la suppression du blacklist :', error);
      throw error;
  }
};