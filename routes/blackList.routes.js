const db = require("../models");
const BlackList = db.blackList;
const controller = require("../controllers/blackList.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.post('/blackListus', async (req, res) => {
    try {
        const blackList = await BlackList.create({
            userId: req.body.userId,
            description: req.body.description,
        });
        res.status(200).send('User added to BlackList successfully');
    } catch (error) {
        console.error('Error adding user to BlackList:', error);
        res.status(500).send('Error adding user to BlackList');
    }
});

app.delete('/blackList/:userId', async (req, res) => {
    try {
        await BlackList.destroy({
            where: {
                userId: req.params.userId,
            },
        });
        res.status(200).send('User removed from BlackList successfully');
    } catch (error) {
        console.error('Error removing user from BlackList:', error);
        res.status(500).send('Error removing user from BlackList');
    }
});

// Route pour récupérer tous les blackLists
app.get('/blackLists', async (req, res) => {
  try {
      const blackLists = await BlackList.findAll(); // Récupérer tous les blackLists depuis la base de données
      res.status(200).json(blackLists); // Renvoyer les blackLists sous forme de réponse JSON
  } catch (error) {
      console.error('Erreur lors de la récupération des blackLists :', error);
      res.status(500).send('Erreur lors de la récupération des blackLists');
  }
});
  // Route pour récupérer une blackList par ID
app.get('/blackLists/:blackListId', async (req, res) => {
  const blackListId = req.params.blackListId;

  try {
      const blackList = await BlackList.findByPk(blackListId); // Récupérer blackList par son ID depuis la base de données

      // Vérifier si le blackList existe
      if (blackList) {
          res.status(200).json(blackList); // Renvoyer blackList sous forme de réponse JSON
      } else {
          res.status(404).send('blackList non trouvé');
      }
  } catch (error) {
      console.error('Erreur lors de la récupération du blackList :', error);
      res.status(500).send('Erreur lors de la récupération du blackList');
  }
});

 // Route pour récupérer  user du blackList
 app.get('/user/blackList/:blackListId', async (req, res) => {
  const blackListId = req.params.blackListId;
  try {
     const user = await controller.getBlackListWithUser(blackListId);
      res.status(200).json(user);
  } catch (error) {
      res.status(500).send('Erreur',error);
  }
});
// Route pour supprimer un ordre par userId
app.delete('/blackLists/del/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
      await controller.deleteBlackListByUserId(userId);
      res.status(200).send('Blacklist supprimé avec succès');
  } catch (error) {
      console.error('Erreur lors de la suppression du blacklist :', error);
      res.status(500).send('Erreur lors de la suppression du blacklist');
  }
});
// Route pour mettre a jour un blackList par ID
app.put('/blackLists/up/:blackListId', async (req, res) => {
    const blackListId = req.params.blackListId;
    const newData = req.body // Récupérer les données du corps de la requête
  
    try {
        const blackListUpdated = await controller.updateBlackListById(blackListId, newData);
        if (blackListUpdated) {
            res.status(200).send('BlackList mis à jour avec succès');
        } else {
            res.status(404).send('BlackList non trouvé ou bien la modification de tels data est interdite');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour du BlackList :', error);
        res.status(500).send('Erreur lors de la mise à jour du BlackList ');
    }
  });
app.post('/blackList', async (req, res) => {
    try {
        const blackList = await BlackList.create({
            description: req.body.description,
    
          });
        res.status(200).send('blackList creé avec succès');
    } catch (error) {
        console.error('Erreur lors de la céation du blackList :', error);
        res.status(500).send('Erreur lors de la céation du blackList');
    }
  });
 





}; 
