const db = require("../models");
const Product = db.product;
const Rating = db.rating;
const controller = require("../controllers/product.controller");
const { Op } = require('sequelize');
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: 'product/' }); 
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  // Route pour récupérer tous les products
app.get('/products', async (req, res) => {
  try {
      const products = await Product.findAll(); // Récupérer tous les products depuis la base de données
      res.status(200).json(products); // Renvoyer les products sous forme de réponse JSON
  } catch (error) {
      console.error('Erreur lors de la récupération des products :', error);
      res.status(500).send('Erreur lors de la récupération des products');
  }
});
  // Route pour récupérer un product par ID
app.get('/products/:productId', async (req, res) => {
  const productId = req.params.productId;

  try {
      const product = await Product.findByPk(productId); // Récupérer l product par son ID depuis la base de données

      // Vérifier si le product existe
      if (product) {
          res.status(200).json(product); // Renvoyer le product sous forme de réponse JSON
      } else {
          res.status(404).send('product non trouvé');
      }
  } catch (error) {
      console.error('Erreur lors de la récupération de product :', error);
      res.status(500).send('Erreur lors de la récupération du product');
  }
});
// Route pour mettre a jour un product par ID
app.put('/products/up/:productId', async (req, res) => {
  const productId = req.params.productId;
  const newData = req.body // Récupérer les données du corps de la requête

  try {
      const productUpdated = await controller.updateProductById(productId, newData);
      if (productUpdated) {
          res.status(200).send('product mis à jour avec succès');
      } else {
          res.status(404).send('product non trouvé ou bien la modification de tels data est interdite');
      }
  } catch (error) {
      console.error('Erreur lors de la mise à jour de product :', error);
      res.status(500).send('Erreur lors de la mise à jour de product ');
  }
});


  // Route pour supprimer un product par ID
  app.delete('/products/del/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        await controller.deleteProductById(productId);
        res.status(200).send('product supprimé avec succès');
    } catch (error) {
        console.error('Erreur lors de la suppression du product :', error);
        res.status(500).send('Erreur lors de la suppression du product');
    }
  });
  
  app.post('/product', async (req, res) => {
    try {
      const product = await Product.create({
        productPic: req.body.productPic,
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice,
        brandId: req.body.brandId,
      });
      res.status(200).json(product); // Return the created product as JSON
    } catch (error) {
      console.error('Erreur lors de la création du produit :', error);
      res.status(500).json({ message: 'Erreur lors de la création du produit' });
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

// Route to upload product picture
app.post('/uploadProductPic', upload.single('productPic'), async (req, res) => {
  const productId = req.body.productId;
  const productPicPath = req.file ? `/product/${req.file.filename}` : null; 


  if (!productPicPath) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: 'product not found' });
    }

    product.productPic = productPicPath;
    await product.save();

    res.json({ success: true, message: 'product picture updated successfully', productPicPath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});
//get productPic
app.get('/productPic/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await controller.getProductById(productId);
    if (product) {
      res.json({
        ...product,
        productPicUrl: `/product/${product.productFilename}`
      });
    } else {
      res.status(404).send('product not found');
    }
  } catch (error) {
    console.error('Failed to retrieve product :', error);
    res.status(500).send('Server error');
  }
});


// Route to search products by name
app.get('/productsss/search', async (req, res) => {
  try {
    const name = req.query.name;

    if (!name) {
      return res.status(400).send({ message: 'Name query parameter is required' });
    }

    const products = await Product.findAll({
      where: {
        productName: {
          [Op.like]: `${name}%` // Matches the start of the productName
        }
      }
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching products', error: error.message });
  }
});
app.get('/productsss/brand/search', async (req, res) => {
  try {
    const name = req.query.name;
    const brandId = req.query.brandId;

    if (!name) {
      return res.status(400).send({ message: 'Name query parameter is required' });
    }

    if (!brandId) {
      return res.status(400).send({ message: 'BrandId query parameter is required' });
    }

    const products = await Product.findAll({
      where: {
        productName: {
          [Op.like]: `${name}%` // Matches the start of the productName
        },
        brandId: brandId
      }
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching products', error: error.message });
  }
});

app.post('/rateProduct', async (req, res) => {
  const { ProductId, rating, userId } = req.body;
  console.log('Request body:', req.body);

  try {
    // Save the rating
    const newRating = await Rating.create({
      ProductId,
      rating,
      userId
    });

    // Calculate the new average rating
    const ratings = await Rating.findAll({ where: { ProductId } });
    const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;

    // Update the product with the new average rating
    await Product.update({ rating: averageRating }, { where: { id: ProductId } });

    res.status(200).json({ message: 'Rating submitted successfully' });
  } catch (error) {
    console.error('Error submitting rating:', error);
    res.status(500).json({ message: 'Error submitting rating', error });
  }
});


}; 
