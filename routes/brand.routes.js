const db = require("../models");
const cors = require("cors");
const Brand = db.brand;
const Product = db.product;
const PaymentPlan = db.paymentPlan;
const Firstpp = db.firstpp;
const Secondpp = db.secondpp;
const Thirdpp = db.thirdpp;
const Fourthpp = db.fourthpp;
const Order = db.order;
const multer = require('multer');
const admin = require("firebase-admin"); 
const path = require('path');
const controller = require("../controllers/brand.controller");
const brandNotification = db.brandNotification;
const express = require("express");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/brands/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  const result = await controller.getBrandIdByUserId(userId);

  if (result.status === 200) {
    res.status(200).json({ brandId: result.brandId });
  } else if (result.status === 404) {
    res.status(404).json({ message: result.message });
  } else {
    res.status(500).json({ message: result.message });
  }
});
// Route pour récupérer tous les brands
app.get('/brands', async (req, res) => {
  try {
      const brands = await Brand.findAll(); // Récupérer tous les brands depuis la base de données
      res.status(200).json(brands); // Renvoyer les brands sous forme de réponse JSON
  } catch (error) {
      console.error('Erreur lors de la récupération des brands :', error);
      res.status(500).send('Erreur lors de la récupération des brands');
  }
});
  // Route pour récupérer une brand par ID
app.get('/brands/:brandId', async (req, res) => {
  const brandId = req.params.brandId;

  try {
      const brand = await Brand.findByPk(brandId); // Récupérer brand par son ID depuis la base de données

      // Vérifier si le brand existe
      if (brand) {
          res.status(200).json(brand); // Renvoyer brand sous forme de réponse JSON
      } else {
          res.status(404).send('brand non trouvé');
      }
  } catch (error) {
      console.error('Erreur lors de la récupération du brand :', error);
      res.status(500).send('Erreur lors de la récupération du brand');
  }
});
 // Route pour récupérer les produits du brand par id
 app.get('/products/brand/:brandId', async (req, res) => {
  const brandId = req.params.brandId;
  try {
     const products = await controller.getBrandProductsById(brandId);
      res.status(200).json(products);
  } catch (error) {
      res.status(500).send('Erreur',error);
  }
});
// Route pour supprimer un ordre par ID
app.delete('/brands/del/:brandId', async (req, res) => {
  const brandId = req.params.brandId;
  try {
      await controller.deleteBrandById(brandId);
      res.status(200).send('brand supprimé avec succès');
  } catch (error) {
      console.error('Erreur lors de la suppression du brand :', error);
      res.status(500).send('Erreur lors de la suppression du brand');
  }
});
// Route pour mettre a jour un brand par ID
app.put('/brands/up/:brandId', async (req, res) => {
    const brandId = req.params.brandId;
    const newData = req.body // Récupérer les données du corps de la requête
  
    try {
        const brandUpdated = await controller.updateBrandById(brandId, newData);
        if (brandUpdated) {
            res.status(200).send('Brand mis à jour avec succès');
        } else {
            res.status(404).send('Brand non trouvé ou bien la modification de tels data est interdite');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour du Brand :', error);
        res.status(500).send('Erreur lors de la mise à jour du Brand ');
    }
  });
app.post('/brand', async (req, res) => {
    try {
        const brand = await Brand.create({
            brandLogo: req.body. brandLogo,
            brandName: req.body.brandName,
            brandCategory: req.body.brandCategory,
          });
        res.status(200).send('brand creé avec succès');
    } catch (error) {
        console.error('Erreur lors de la céation du brand :', error);
        res.status(500).send('Erreur lors de la céation du brand');
    }
  });
 


 // Configure multer for file upload
 const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'product/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
// Upload endpoint
app.post('/uploadBrandLogo', upload.single('brandLogo'), async (req, res) => {
  const brandId = req.body.brandId;
  const brandLogoPath = req.file ? `/brand/${req.file.filename}` : null;

  if (!brandLogoPath) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  try {
    const brand = await Brand.findByPk(brandId);

    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }

    brand.brandLogo = brandLogoPath;
    await brand.save();

    res.json({ success: true, message: 'Brand logo updated successfully', brandLogoPath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

//getLogo
app.get('/brandLogo/:brandId', async (req, res) => {
  const { brandId } = req.params;
  try {
    const brand = await controller.getBrandById(brandId); // Replace with your method to get brand details
    if (brand) {
      res.json({
        ...brand,
        logoUrl: `/brand/${brand.logoFilename}`
      });
    } else {
      res.status(404).send('Brand not found');
    }
  } catch (error) {
    console.error('Failed to retrieve brand :', error);
    res.status(500).send('Server error');
  }
});

// Route to get brand IDs by brand name
app.get('/brandIds/:brandName', async (req, res) => {
  const brandName = req.params.brandName;
  try {
    const brands = await Brand.findAll({
      where: { brandName: brandName },
      attributes: ['id']
    });

    const brandIds = brands.map(brand => brand.id);
    res.status(200).json(brandIds);
  } catch (error) {
    console.error('Error fetching brand IDs:', error);
    res.status(500).send('Error fetching brand IDs');
  }
});


// Route to get unique brand names
app.get('/uniqueBrandNames', async (req, res) => {
  try {
    const uniqueBrandNames = await Brand.findAll({
      attributes: [
        [db.Sequelize.fn('DISTINCT', db.Sequelize.col('brandName')), 'brandName']
      ]
    });

    res.status(200).json(uniqueBrandNames);
  } catch (error) {
    console.error('Error fetching unique brand names:', error);
    res.status(500).send('Error fetching unique brand names');
  }
});
app.post('/sendNotificationToBrand', async (req, res) => {
  const { brandId, title, message } = req.body; // Ensure description is included

  try {
  
    // Fetch the brand to get the FCM token
    const brand = await Brand.findByPk(brandId);
    if (!brand || !brand.fcmToken) {
      return res.status(404).json({ message: 'Brand or FCM token not found' });
    }

    const fcmToken = brand.fcmToken;

    // Send notification via FCM
    const payload = {
      notification: {
        title,
        body: message, // Use message for notification body
      },
      token: fcmToken,
    };

    const response = await admin.messaging().send(payload);
    console.log('Successfully sent message:', response);

    res.status(200).json({ message: 'Notification sent successfully and saved to backend' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ message: 'Error sending notification' });
  }
});


// Route to delete notifications for a specific brand
app.delete('/notifications/brand/delAll/:brandId', async (req, res) => {
  const brandId = req.params.brandId;
  
  try {
    const result = await controller.deleteBrandNotifs(brandId);

    if (result > 0) {
      res.status(200).json({ message: `Deleted ${result} notifications.` });
    } else {
      res.status(404).json({ message: 'No notifications found for this brand.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Endpoint to get orders with products and payment plans for a specific brand
app.get('/orders/brand/:brandId', async (req, res) => {
  const { brandId } = req.params;
  try {
    const orders = await Order.findAll({
      where: {},
      include: [
        {
          model: Product,
          where: { brandId },
          through: {
            attributes: [],
          },
        },
        {
          model: PaymentPlan,
          include: [
            {
              model: Firstpp,
            },
            {
              model: Secondpp,
            },
            {
              model: Thirdpp,
            },
            {
              model: Fourthpp,
            }
          ],
        },
      ],
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});


}; 
