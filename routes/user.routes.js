const db = require("../models");
const User = db.user;
const Firstpp = db.firstpp;
const Secondpp = db.secondpp;
const Thirdpp = db.thirdpp;
const Fourthpp = db.fourthpp;
const controller = require("../controllers/user.controller");
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });


  app.get('/installments/unpaid', controller.getAllUnpaidInstallments);
// Route pour récupérer tous les Utilisateurs
app.get('/users', async (req, res) => {
  try {
      const users = await User.findAll(); // Récupérer tous les Utilisateurs depuis la base de données
      res.status(200).json(users); // Renvoyer les Utilisateurs sous forme de réponse JSON
  } catch (error) {
      console.error('Erreur lors de la récupération des users :', error);
      res.status(500).send('Erreur lors de la récupération des users');
  }
});

// Endpoint to check if phone number exists
app.get('/users/phoneNum', async (req, res) => {
  try {
    const { phone } = req.query;
    const user = await User.findOne({ where: { phoneNum: phone } });
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: 'Phone number not found' });
    }
  } catch (error) {
    console.error('Error fetching user by phone number:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
// Search user by phone number
app.get('/users/search/phoneNum', async (req, res) => {
  try {
    const phoneNum = req.query.phone;
    if (!phoneNum) {
      return res.status(400).send({ message: 'Phone number is required' });
    }

    const users = await User.findAll({
      where: {
        phoneNum: {
          [db.Sequelize.Op.like]: `${phoneNum}%`
        }
      }
    });

    if (users.length > 0) {
      res.json(users);
    } else {
      res.status(404).send({ message: 'No users found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error searching users', error });
  }
});
  //Route pour récupérer un utilisateur par email
 app.get('/users/email/:email', async (req, res) => {
  const email = req.params.email;

  try {
      const user = await User.findOne({where: {
        email: email
      }}); // Récupérer l'utilisateur par son email depuis la base de données

      // Vérifier si l'utilisateur existe
      if (user) {
          res.status(200).json(user); // Renvoyer l'utilisateur sous forme de réponse JSON
      } else {
          res.status(404).send('Utilisateur non trouvé');
      }
  } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur :', error);
      res.status(500).send('Erreur lors de la récupération de l\'utilisateur');
  }
});
  // Route pour récupérer un utilisateur par ID
app.get('/userss/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
      const user = await User.findByPk(userId); // Récupérer l'utilisateur par son ID depuis la base de données

      // Vérifier si l'utilisateur existe
      if (user) {
          res.status(200).json(user); // Renvoyer l'utilisateur sous forme de réponse JSON
      } else {
          res.status(404).send('Utilisateur non trouvé');
      }
  } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur :', error);
      res.status(500).send('Erreur lors de la récupération de l\'utilisateur');
  }
});

// Route pour supprimer un utilisateur par ID
app.delete('/users/del/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
      await controller.deleteUserById(userId);
      res.status(200).send('Utilisateur supprimé avec succès');
  } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
      res.status(500).send('Erreur lors de la suppression de l\'utilisateur');
  }
});
// Route pour mettre a jour un utilisateur par ID
app.put('/users/up/:userId', async (req, res) => {
  const userId = req.params.userId;
  const newData = req.body;// Récupérer les données du corps de la requête

  try {
      const userUpdated = await controller.updateUserById(userId, newData);
      if (userUpdated) {
          res.status(200).send('Utilisateur mis à jour avec succès');
      } else {
          res.status(404).send('Utilisateur non trouvé ou bien la modification de tels data est interdite');
      }
  } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      res.status(500).send('Erreur lors de la mise à jour de l\'utilisateur');
  }
});
// Route pour recuperer id client 

app.get('/clientId/:userId', async (req, res) => {
  try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
          return res.status(400).send('Invalid user ID');
      }

      const clientId = await  controller.fetchClientIdByUserId(userId);
      if (clientId) {
          res.json({ clientId: clientId });
      } else {
          res.status(404).send('Client not found');
      }
  } catch (error) {
      console.error("Error in fetching client ID:", error);
      res.status(500).send('Internal Server Error');
  }
});

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route to upload profile picture
app.post('/uploadProfilePic', upload.single('profilePic'), async (req, res) => {
  const userId = req.body.userId;
  const profilePicPath = req.file ? `/uploads/${req.file.filename}` : null; 


  if (!profilePicPath) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.profilePic = profilePicPath;
    await user.save();

    res.json({ success: true, message: 'Profile picture updated successfully', profilePicPath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

app.get('/allInstallments', async (req, res) => {
  try {
    const firstInstallments = await Firstpp.findAll();
    const secondInstallments = await Secondpp.findAll();
    const thirdInstallments = await Thirdpp.findAll();
    const fourthInstallments = await Fourthpp.findAll();

    res.json({
      firstInstallments,
      secondInstallments,
      thirdInstallments,
      fourthInstallments
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

}; 
