const db = require("../models");
const Order = db.order;
const OrderProduct = db.orderProduct;
const controller = require("../controllers/order.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
// Route pour récupérer tous les orders
app.get('/orders', async (req, res) => {
  try {
      const orders = await Order.findAll(); // Récupérer tous les ordres depuis la base de données
      res.status(200).json(orders); // Renvoyer les ordres sous forme de réponse JSON
  } catch (error) {
      console.error('Erreur lors de la récupération des orders :', error);
      res.status(500).send('Erreur lors de la récupération des ordres');
  }
});
  // Route pour récupérer un ordre par ID
app.get('/orders/:orderId', async (req, res) => {
  const orderId = req.params.orderId;

  try {
      const order = await Order.findByPk(orderId); // Récupérer ordre par son ID depuis la base de données

      // Vérifier si l'ordre existe
      if (order) {
          res.status(200).json(order); // Renvoyer ordre sous forme de réponse JSON
      } else {
          res.status(404).send('aucun ordre trouvé');
      }
  } catch (error) {
      console.error('Erreur lors de la récupération de l ordre :', error);
      res.status(500).send('Erreur lors de la récupération du l ordre');
  }
});
 // Route pour récupérer les produits de chaque order 
 app.get('/products/order/:orderId', async (req, res) => {
  const orderId = req.params.orderId;
  try {
     const products = await controller.getOrderWithProducts(orderId);
      res.status(200).json(products);
  } catch (error) {
      res.status(500).send('Erreur',error);
  }
});
// Route pour supprimer un ordre par ID
app.delete('/orders/del/:orderId', async (req, res) => {
  const orderId = req.params.orderId;
  try {
      await controller.deleteOrderById(orderId);
      res.status(200).send('ordre supprimé avec succès');
  } catch (error) {
      console.error('Erreur lors de la suppression de l ordre :', error);
      res.status(500).send('Erreur lors de la suppression du l ordre');
  }
});

app.post('/order', async (req, res) => {
    try {
        const order = await Order.create({
           orderDescription: req.body. orderDescription,
           totalCost: req.body.totalCost,
           paymentPlanId:  req.body.paymentPlanId,
           clientId:  req.body.clientId
          });
        res.status(200).send({id: order.id,});
    } catch (error) {
        console.error('Erreur lors de la céation de l ordre :', error);
        res.status(500).send('Erreur lors de la céation du l ordre');
    }
  });
  app.get('/paymentPlan/order/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const pp = await controller.getOrderWithPaymentPlan(id);
      if (pp) {
        res.json(pp);
      } else {
        res.status(404).send('paymentPlan of order not found');
      }
    } catch (error) {
      console.error('Failed to retrieve order paymentPlan :', error);
      res.status(500).send('Server error');
    }
  });

 app.post('/orderProduct', async (req, res) => {
    try {
  
      // Create the orderProduct
      const orderProduct = await OrderProduct.create({
        OrderId: req.body.OrderId,
        ProductId: req.body.ProductId,
      });
  
      res.status(200).send({ id: orderProduct.id });
    } catch (error) {
      console.error('Error creating OrderProduct:', error);
      res.status(500).send('Error creating OrderProduct');
    }
  });

}; 
