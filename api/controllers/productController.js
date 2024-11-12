const db = require('../models/db');
const { io } = require('../app'); 


const executeQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

module.exports = {
  addProduct: async (req, res) => {
    const { name, price, description, category_id, brand_id, size_id, color_id, person, quantity } = req.body;

    if (!name || !price || !category_id || !brand_id || !size_id || !color_id || !person || quantity === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `
      INSERT INTO Products (name, price, description, category_id, brand_id, size_id, color_id, person, quantity)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
      const result = await executeQuery(query, [name, price, description, category_id, brand_id, size_id, color_id, person, quantity]);
      const newProduct = { id: result.insertId, name, price, description, category_id, brand_id, size_id, color_id, person, quantity };
      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ error: 'Error adding product', details: error.message });
    }
  },

  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { name, price, description, category_id, brand_id, size_id, color_id, person, quantity } = req.body;

    if (!name || !price || !category_id || !brand_id || !size_id || !color_id || !person || quantity === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `
      UPDATE Products
      SET name = ?, price = ?, description = ?, category_id = ?, brand_id = ?, size_id = ?, color_id = ?, person = ?, quantity = ?
      WHERE id = ?
    `;

    try {
      const result = await executeQuery(query, [name, price, description, category_id, brand_id, size_id, color_id, person, quantity, id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json({ id, name, price, description, category_id, brand_id, size_id, color_id, person, quantity });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: 'Error updating product', details: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    const { id } = req.params;

    const checkProductQuery = `SELECT * FROM Products WHERE id = ?`;
    try {
      const product = await executeQuery(checkProductQuery, [id]);

      if (product.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const query = `DELETE FROM Products WHERE id = ?`;
      await executeQuery(query, [id]);

      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: 'Error deleting product', details: error.message });
    }
  },

  getFilters: async (req, res) => {
    try {

      const categoriesQuery = `SELECT id, name FROM Categories`;
      const categories = await executeQuery(categoriesQuery);


      const gendersQuery = `SELECT DISTINCT person AS name FROM Products WHERE person IS NOT NULL`;
      const genders = await executeQuery(gendersQuery);


      const brandsQuery = `SELECT id, name FROM Brands`;
      const brands = await executeQuery(brandsQuery);


      const colorsQuery = `SELECT id, name FROM Colors`;
      const colors = await executeQuery(colorsQuery);

      const sizesQuery = `SELECT id, size FROM Sizes`;
      const sizes = await executeQuery(sizesQuery);

      res.status(200).json({
        categories,
        genders,
        brands,
        colors,
        sizes
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching filter data', details: error.message });
    }
  },
  searchProducts: async (req, res) => {
    const {
      category,
      gender,
      brand,
      price_min,
      price_max,
      size,
      color,
      availability
    } = req.query;

    try {

      let query = `SELECT * FROM Products WHERE quantity > 0`;

      let conditions = [];

      if (category) {
        conditions.push(`category_id = ${parseInt(category)}`);
      }
      if (gender) {
        conditions.push(`person = '${gender}'`);
      }
      if (brand) {
        conditions.push(`brand_id = ${parseInt(brand)}`);
      }
      if (price_min) {
        conditions.push(`price >= ${parseFloat(price_min)}`);
      }
      if (price_max) {
        conditions.push(`price <= ${parseFloat(price_max)}`);
      }
      if (size) {
        conditions.push(`size_id = ${parseInt(size)}`);
      }
      if (color) {
        conditions.push(`color_id = ${parseInt(color)}`);
      }
      if (availability) {

        if (availability === 'in') {
          conditions.push(`quantity > 0`);
        } else if (availability === 'out') {
          conditions.push(`quantity = 0`);
        }
      }

      if (conditions.length > 0) {
        query += ' AND ' + conditions.join(' AND ');
      }


      const filteredProducts = await executeQuery(query);


      res.status(200).json(filteredProducts);

    } catch (error) {
      console.error("Error searching for products:", error);
      res.status(500).json({ error: 'Error searching for products', details: error.message });
    }
  },
  getProductById: async (req, res) => {
    const { id } = req.params;

    const query = `
        SELECT 
          p.id,
          p.name,
          p.price,
          p.description,
          p.quantity,
          b.name AS brand,        -- Fetch the brand name
          co.name AS color,       -- Fetch the color name
          c.name AS category      -- Fetch the category name
        FROM Products p
        JOIN Brands b ON p.brand_id = b.id  -- Join with Brands table to get the brand name
        JOIN Colors co ON p.color_id = co.id  -- Join with Colors table to get the color name
        JOIN Categories c ON p.category_id = c.id  -- Join with Categories table to get the category name
        WHERE p.id = ?
      `;

    try {
      const product = await executeQuery(query, [id]);

      if (product.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json(product[0]);
    } catch (error) {
      console.error("Error fetching product details:", error);
      res.status(500).json({ error: 'Error fetching product details', details: error.message });
    }
  },

  getProductQuantity: async (req, res) => {
    const { id } = req.params;
    const productQuery = `SELECT * FROM Products WHERE id = ?`;
    const soldQuantityQuery = `SELECT SUM(quantity) AS sold_quantity FROM Order_Items WHERE product_id = ?`;
  
    try {
      const product = await executeQuery(productQuery, [id]);
      if (product.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      const soldQuantityResult = await executeQuery(soldQuantityQuery, [id]);
      const soldQuantity = soldQuantityResult[0].sold_quantity || 0;
      const currentQuantity = product[0].quantity - soldQuantity;
  
      io.emit('productQuantityUpdated', {
        product_id: id,
        current_quantity: currentQuantity,
      });
  
      res.status(200).json({
        product_id: id,
        name: product[0].name,
        initial_quantity: product[0].quantity,
        sold_quantity: soldQuantity,
        current_quantity: currentQuantity,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching product quantity', details: error.message });
    }
  },  

  getAllProducts: async (req, res) => {
    const query = `SELECT * FROM Products`;
    try {
      const results = await executeQuery(query);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products', details: error.message });
    }
  }
};
