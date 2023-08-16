import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const bindApiKey = process.env.BIND_API_KEY;

const productBindRoutes = express.Router();

const getBindProducts = async (req, res) => {
  const { data } = await axios.get('https://api.bind.com.mx/api/Products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bindApiKey}`,
    },
  });
  const filteredData = data.value.map((item) => {
    return {
      code: item.Code,
      stock: item.CurrentInventory,
      title: item.Title,
      unit: item.Unit,
    };
  });
  // console.log(data);
  res.json(filteredData);
};

productBindRoutes.route('/').get(getBindProducts);

export default productBindRoutes;
