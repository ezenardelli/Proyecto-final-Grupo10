const { validationResult } = require('express-validator');
const db = require('../../database/models');

const productApiController = {
  getAllProducts: async (req, res) => {
    try {
      const limit = 10;
      const offset = req.query.offset ? parseInt(req.query.offset) : 0;

      const products = await db.Product.findAll({
      offset: offset,
      limit: limit,
      });
      
      const count = await db.Product.count();

      const nextOffset = offset + limit;
      const previousOffset = offset - limit;

      const productData = {
        count: count,
        next: nextOffset < count ? `http://localhost:3031/api/products?offset=${nextOffset}` : null,
        previous: previousOffset >= 0 ? `http://localhost:3031/api/products?offset=${previousOffset}` : null,
        products: products.map((product) => ([{
          id: product.id,
          name: product.name,
          description: product.description,
          detail: `http://localhost:3031/api/products/${product.id}`,
        }])),
      };

      res.json(productData);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id, {      });

      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }


      const productData = {
        id: product.id,
        name: product.name,
        description: product.description,
        origin: product.origin,
        destination: product.destination,
        person: product.person,
        date: product.date,
        price: product.price,
        category: product.category_id,
        image: `http://localhost:3031/img/productImage/${product.image}`,
      };

      res.json(productData);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  },
};

module.exports = productApiController;
