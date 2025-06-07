const db = require("../models");
const User = db.user;
const Client = db.client;
const Firstpp = db.firstpp;
const Secondpp = db.secondpp;
const Thirdpp = db.thirdpp;
const Fourthpp = db.fourthpp;
const bcrypt = require('bcryptjs');
// Fonction pour supprimer un utilisateur par ID
exports.deleteUserById  = async (userId) => {
  try {
      const user = await User.destroy({
          where: {
              id: userId
          }
      });
      console.log('Nombre d\'utilisateurs supprimés :', user);
  } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
      throw error;
  }
};
// Fonction pour mettre à jour un utilisateur par ID
exports.updateUserById = async (userId, newData) => {
  try {
    // Check if the newData contains a password field
    if (newData.password) {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);
      // Hash the password
      newData.password = await bcrypt.hash(newData.password, salt);
    }

    // Use the update method to update the user
    const result = await User.update(newData, {
      where: {
        id: userId
      }
    });

    // Check the number of records updated
    console.log('Number of records updated:', result[0]);

    // Return true if at least one record was updated
    return result[0] > 0;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
  // Récupérer le user et ses infos client a partir de son email
  exports.getUserDetailsByEmail = async (email) => {
    try {
        const user = await User.findOne({
          where: { email: email },
          include: [
            {
              model: Client,
              required: false  // Rejoindre avec la table Client si disponible
            },
          ]
        });
    
        if (!user) return null;  // Aucun utilisateur trouvé
    
        return user;
      } catch (error) {
        console.error('Erreur lors de la récupération des détails utilisateur:', error);
        throw error;
      }
  }
  exports.fetchClientIdByUserId = async (userId) => {
    try {
        const client = await Client.findOne({
            include: [{
                model: User,
                where: { id: userId }
            }],
            attributes: ['id'] // This will fetch only the client's ID
        });

        if (client) {
            console.log("Client ID:", client.id);
            return client.id; // Return the client ID
        } else {
            console.log("No client found for this user.");
            return null; // No client found
        }
    } catch (error) {
        console.error("Error fetching client ID:", error);
        throw error; // Propagate the error
    }
}

exports.getAllUnpaidInstallments = async (req, res) => {
  try {
    const unpaidFirstpp = await Firstpp.findAll({
      where: { first_installmentStatus: 'unpaid' },
      attributes: ['first_installmentDate', 'first_installmentPrice']
    });

    const unpaidSecondpp = await Secondpp.findAll({
      where: { second_installmentStatus: 'unpaid' },
      attributes: ['second_installmentDate', 'second_installmentPrice']
    });

    const unpaidThirdpp = await Thirdpp.findAll({
      where: { third_installmentStatus: 'unpaid' },
      attributes: ['third_installmentDate', 'third_installmentPrice']
    });

    const unpaidFourthpp = await Fourthpp.findAll({
      where: { fourth_installmentStatus: 'unpaid' },
      attributes: ['fourth_installmentDate', 'fourth_installmentPrice']
    });

    const result = {
      firstpp: unpaidFirstpp,
      secondpp: unpaidSecondpp,
      thirdpp: unpaidThirdpp,
      fourthpp: unpaidFourthpp,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching unpaid installments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};