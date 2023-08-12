import express from 'express';
import Product from '../models/Product.js';

const productRoutes = express.Router();

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

const addProducts = async (req, res) => {
  console.log(req.body);
  const newProduct = req.body;
  const product = new Product(newProduct);
  product.save();
  res.json(product);
};

productRoutes.route('/').get(getProducts);
productRoutes.route('/').post(addProducts);

export default productRoutes;
