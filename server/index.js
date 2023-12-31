import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import newsRoutes from './routes/news-routes.js';
import productRoutes from './routes/product-routes.js';
import connectToDatabase from './database.js';
import productBindRoutes from './routes/product-bind-routes.js';
import bodyParser from 'body-parser';
import userRoutes from './routes/user-routes.js';
import authMiddleWare from './middleware/auth.js';

// Routes

dotenv.config();
connectToDatabase(); // connecting to db in mongo
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());

const port = process.env.PORT || 3001;

app.use('/abamat/news', newsRoutes);
app.use('/abamat/products', productRoutes);
app.use('/abamat/newproduct', productRoutes);
app.use('/abamat/bind-products', productBindRoutes);
app.use('/abamat/users', userRoutes);

app.listen(port, () => {
  console.log('Express Js Server running on port', port);
});
