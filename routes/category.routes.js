const db = require("../models");
const Category = db.category;
const Brand = db.brand;

const controller = require("../controllers/category.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
// Route pour récupérer tous les categories
app.get('/categories', async (req, res) => {
  try {
      const categories = await Category.findAll(); // Récupérer tous les categories depuis la base de données
      res.status(200).json(categories); // Renvoyer les categories sous forme de réponse JSON
  } catch (error) {
      console.error('Erreur lors de la récupération des categories :', error);
      res.status(500).send('Erreur lors de la récupération des categories');
  }
});
  // Route pour récupérer une category par ID
app.get('/categories/:catId', async (req, res) => {
  const catId = req.params.catId;

  try {
      const category = await Category.findByPk(catId); // Récupérer category par son ID depuis la base de données

      // Vérifier si le category existe
      if (category) {
          res.status(200).json(category); // Renvoyer category sous forme de réponse JSON
      } else {
          res.status(404).send('category non trouvé');
      }
  } catch (error) {
      console.error('Erreur lors de la récupération du category :', error);
      res.status(500).send('Erreur lors de la récupération du category');
  }
});
// Get brands by category
app.get('/:categoryId/brands', async (req, res) => {
  const { categoryId } = req.params;
  try {
    const brands = await Brand.findAll({ where: { categoryId } });
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch brands' });
  }
});

 // Route pour récupérer les brands du category par id
 app.get('/category/brands/:catId', async (req, res) => {
  const catId = req.params.catId;
  try {
     const brands = await controller.getCategoryBrandsById(catId)
      res.status(200).json(brands);
  } catch (error) {
      res.status(500).send('Erreur',error);
  }
});

}; 
