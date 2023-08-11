import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import newsRoutes from './routes/news-routes.js';
import connectToDatabase from './database.js';

// Routes

dotenv.config();
connectToDatabase(); // connecting to db in mongo
const app = express();
app.use(cors());

app.use(express.json());

const port = process.env.PORT || 3001;

app.use('/abamat/news', newsRoutes);

app.listen(port, () => {
  console.log('Express Js Server running on port', port);
});
